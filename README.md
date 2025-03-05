
## **📄 InsightXplorer – Interactive Data Dashboard**

🚀 **InsightXplorer** is a **interactive dashboard** for analyzing **global business, energy, and industry insights** using **Flask (Backend), MySQL (Database), and React + D3.js (Frontend).**

It features **interactive charts, advanced filters, and a premium UI** to explore data trends effectively.

* * *

## **📂 Project Structure**

```
/blackcoffer-dashboard
│── /public
│── /src
│   │── /components         # Reusable UI components (Sidebar, Table, Filters, Header)
│   │── /pages              # Dashboard and other pages
│   │── /charts             # D3.js & Recharts chart components
│   │── /styles             # CSS & theme styles
│   │── /utils              # Helper functions (API calls, formatting)
│   │── App.js              # Main React app component
│   │── index.js            # Entry point
│── /backend                # Flask backend (separate directory)
│   │── /dataset               # JSON data 
│   │── app.py              # Main Flask application
│── package.json            # React dependencies
│── requirements.txt        # Python dependencies
│── README.md               # Project documentation
```

* * *

## **🛠️ Technologies Used**

### **Frontend (React + Material-UI + D3.js)**

* **React.js** – UI development
* **Material-UI (MUI)** – Professional design system
* **D3.js, Recharts, Plotly.js** – Data visualization
* **React-Leaflet** – Interactive maps
* **Axios** – API integration
* **Zustand** – State management
* **Framer Motion** – Animations & transitions

### **Backend (Flask + MySQL)**

* **Flask** – API framework
* **Flask-SQLAlchemy** – ORM for MySQL
* **MySQL** – Stores structured JSON data
* **Pandas** – Data preprocessing
* **Flask-CORS** – Enables frontend-backend communication

* * *

## **🎨 Features**

### **1️⃣ Professional UI & Layout**

* **Vuexy-style premium design**
* **Collapsible sidebar navigation**
* **Curved edges (`border-radius: 12px`) for all containers**
* **Smooth animations with Framer Motion**

### **2️⃣ Interactive Charts (D3.js + Recharts)**

✔ **Bar Chart** – Frequency of insights by sector  
✔ **Pie Chart** – PESTLE framework distribution  
✔ **Scatter Plot** – Intensity vs Likelihood (size = relevance)  
✔ **Heatmap** – Sector vs Region  
✔ **Choropleth Map** – Intensity by Country  
✔ **Time Series Plot** – Insights over time  
✔ **Violin Plot** – Intensity distribution by end year  
✔ **Stacked Bar Chart** – Sector vs Topic  
✔ **Box Plot** – Intensity by Sector

### **3️⃣ Data Table (Material-UI)**

✔ **Curved edges & professional UI**  
✔ **Sortable & searchable table**  
✔ **Export data as CSV**  
✔ **Horizontal scrolling for large datasets**

### **4️⃣ Advanced Filters**

✔ **Dropdown filters for Year, Country, Topic, Region, Sector, PEST, SWOT**  
✔ **Live filtering of table & charts**  
✔ **Search bar for quick access**

### **5️⃣ API Integration**

✔ **Fetch data from Flask API (`/api/data`)**  
✔ **Upload new JSON data (`/api/upload`)**

### **6️⃣ Export & Reports**

✔ **Download table data as CSV**  
✔ **Save charts as PNG/SVG**  
✔ **Print reports directly from the dashboard**

* * *

## **📌 API Endpoints**

### **1️⃣ Fetch All Data**

```http
GET /api/data
```

📌 **Response Example**

```json
[
  {
    "id": 1795,
    "title": "U.S. natural gas consumption is expected to increase.",
    "sector": "Energy",
    "topic": "gas",
    "intensity": 6,
    "likelihood": 3,
    "relevance": 2,
    "country": "United States",
    "region": "Northern America",
    "source": "EIA",
    "published": "2017"
  }
]
```

### **2️⃣ Upload New JSON Data**

```http
POST /api/upload
```

📌 **Request Example**

```json
{
  "file": "jsondata.json"
}
```

📌 **Response Example**

```json
{
  "message": "Data uploaded successfully",
  "rows_inserted": 500
}
```

* * *

## **📌 How to Run the Project**

### **1️⃣ Backend (Flask)**

1. Navigate to the backend folder:
    
    ```sh
    cd backend
    ```
    
2. Install dependencies:
    
    ```sh
    pip install -r requirements.txt
    ```
    
3. Start Flask API:
    
    ```sh
    python app.py
    ```
    

✅ **API will run on:** `http://127.0.0.1:5000/api/data`

* * *

### **2️⃣ Frontend (React)**

1. Navigate to the React folder:
    
    ```sh
    cd blackcoffer-dashboard
    ```
    
2. Install dependencies:
    
    ```sh
    yarn install
    ```
    
3. Start the frontend:
    
    ```sh
    yarn start
    ```
    

✅ **Dashboard will open at:** `http://localhost:3000`

* * *

## **📌 Next Steps**

* **🚀 Implement Advanced Filters** (In Progress)
* **📊 Add Export & Reporting Features** (Upcoming)

* * *