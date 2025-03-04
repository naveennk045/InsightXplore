from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import pandas as pd
import json
from datetime import datetime
from sqlalchemy.exc import DataError, IntegrityError

app = Flask(__name__)
CORS(app)

# MySQL Config
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:7261@localhost/blackcoffer_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Database Model
class Insight(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    end_year = db.Column(db.String(255), nullable=True)
    intensity = db.Column(db.Integer, nullable=True)
    sector = db.Column(db.String(255), nullable=True)
    topic = db.Column(db.String(255), nullable=True)
    insight = db.Column(db.Text, nullable=True)
    url = db.Column(db.String(500), nullable=True)
    region = db.Column(db.String(255), nullable=True)
    start_year = db.Column(db.String(255), nullable=True)
    impact = db.Column(db.String(255), nullable=True)
    added = db.Column(db.String(255), nullable=True)
    published = db.Column(db.String(255), nullable=True)
    country = db.Column(db.String(255), nullable=True)
    relevance = db.Column(db.Integer, nullable=True)
    pestle = db.Column(db.String(255), nullable=True)
    source = db.Column(db.String(255), nullable=True)
    title = db.Column(db.Text, nullable=True)
    likelihood = db.Column(db.Integer, nullable=True)

# Initialize database tables (run once)
with app.app_context():
    db.create_all()

# Preprocess JSON data
def preprocess_data(df):
    def parse_int(value):
        if pd.isna(value) or value == '' or value is None:
            return None
        try:
            return int(float(value))
        except (ValueError, TypeError):
            print(f"Warning: Invalid integer value '{value}' converted to None")
            return None

    def parse_string(value, max_length=None):
        if pd.isna(value) or value == '':
            return None
        value = str(value).strip()
        return value if value else None

    def parse_date_to_year(date_str):
        if pd.isna(date_str) or date_str == '':
            return None
        try:
            return str(datetime.strptime(date_str, '%B, %d %Y %H:%M:%S').year)
        except ValueError:
            return date_str

    # Apply preprocessing
    df['intensity'] = df['intensity'].apply(parse_int)
    df['relevance'] = df['relevance'].apply(parse_int)
    df['likelihood'] = df['likelihood'].apply(parse_int)
    df['start_year'] = df['start_year'].apply(lambda x: parse_string(x, 255))
    df['end_year'] = df['end_year'].apply(lambda x: parse_string(x, 255))
    df['added'] = df['added'].apply(parse_date_to_year)
    df['published'] = df['published'].apply(parse_date_to_year)
    df['sector'] = df['sector'].apply(lambda x: parse_string(x, 255))
    df['topic'] = df['topic'].apply(lambda x: parse_string(x, 255))
    df['pestle'] = df['pestle'].apply(lambda x: parse_string(x, 255))
    df['region'] = df['region'].apply(lambda x: parse_string(x, 255))
    df['country'] = df['country'].apply(lambda x: parse_string(x, 255))
    df['source'] = df['source'].apply(lambda x: parse_string(x, 255))
    df['impact'] = df['impact'].apply(lambda x: parse_string(x, 255))
    df['insight'] = df['insight'].apply(parse_string)
    df['title'] = df['title'].apply(parse_string)
    df['url'] = df['url'].apply(lambda x: parse_string(x, 500))

    df = df.where(pd.notna(df), None) 
    df = df.replace({pd.NA: None, "nan": None, float("nan"): None}) 
    return df


# Upload endpoint: Preprocess and store data
@app.route('/api/upload', methods=['POST'])
def upload_data():
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400

    try:
        # Preprocess JSON
        file_content = file.read().decode('utf-8')
        data = json.loads(file_content)
        df = pd.DataFrame(data)
        cleaned_df = preprocess_data(df)
        cleaned_data = cleaned_df.to_dict(orient='records')

        # Store in database
        for row in cleaned_data:
            new_entry = Insight(
                end_year=row.get('end_year'),
                intensity=row.get('intensity'),
                sector=row.get('sector'),
                topic=row.get('topic'),
                insight=row.get('insight'),
                url=row.get('url'),
                region=row.get('region'),
                start_year=row.get('start_year'),
                impact=row.get('impact'),
                added=row.get('added'),
                published=row.get('published'),
                country=row.get('country'),
                relevance=row.get('relevance'),
                pestle=row.get('pestle'),
                source=row.get('source'),
                title=row.get('title'),
                likelihood=row.get('likelihood')
            )
            db.session.add(new_entry)
        
        db.session.commit()
        return jsonify({
            "message": "Preprocessing completed and data uploaded successfully",
            "rows_inserted": len(cleaned_data)
        }), 201

    except json.JSONDecodeError as e:
        db.session.rollback()
        return jsonify({"error": f"Invalid JSON: {str(e)}"}), 400
    except DataError as e:
        db.session.rollback()
        return jsonify({"error": f"Database data error: {str(e)}"}), 400
    except IntegrityError as e:
        db.session.rollback()
        return jsonify({"error": f"Database integrity error: {str(e)}"}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Upload error: {str(e)}"}), 500

# Retrieve data endpoint
@app.route('/api/data', methods=['GET'])
def get_data():
    try:
        insights = Insight.query.all()
        result = [
            {
                "id": i.id,
                "end_year": i.end_year,
                "intensity": i.intensity,
                "sector": i.sector,
                "topic": i.topic,
                "insight": i.insight,
                "url": i.url,
                "region": i.region,
                "start_year": i.start_year,
                "impact": i.impact,
                "added": i.added,
                "published": i.published,
                "country": i.country,
                "relevance": i.relevance,
                "pestle": i.pestle,
                "source": i.source,
                "title": i.title,
                "likelihood": i.likelihood
            }
            for i in insights
        ]
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": f"Retrieval error: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True)