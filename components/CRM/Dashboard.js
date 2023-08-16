// import axios from "axios";
// import React, { Component } from "react";
// import Classes from  "/styles/dashboard-home.module.css";
// import { IconButton } from "@mui/material";
// import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
// import { Link } from "react-router-dom";
// import { Spinner } from "react-bootstrap";
// import CTA from "../Comps/CTA";
// export default class Dashboard extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       baseurl: sessionStorage.getItem("apipathurl"),
//       isAssetApiHitComplete: false,
//       isAssetFound: false,
//       assetCount: 0,
//       assetCost: 0,
//       availableAssetCount: 0,
//       selectedFinancialYear: 2023,
//       financialYearCost: 0,
//       yearRange: [],
//       isFinancialCostApiHitComplete: false,
//       assignedAssets: 0,
//       fromdate: "2023-04-01",
//       todate: "2024-03-31",
//     };
//     this.getFinancialYearCost = this.getFinancialYearCost.bind(this);
//   }

//   getFinancialYearCost = async (fromdate, todate) => {
//     // e.preventDefault();
//     if (fromdate != "" && todate != "") {
//       console.log(fromdate, todate);
//       this.setState({ isFinancialCostApiHitComplete: false });
//       const response = await fetch(
//         `${this.state.baseurl}/asset-cost/${fromdate}/${todate}`
//       );
//       const data = await response.json();
//       var totalCost = 0;
//       data.forEach((asset) => {
//         totalCost += Math.ceil(asset.cost);
//       });
//       console.log(data);
//       this.setState({
//         financialYearCost: totalCost,
//         isFinancialCostApiHitComplete: true,
//       });
//     } else {
//       alert("Must fill from Date & to Date");
//     }
//   };
//   componentDidMount() {
//     // This function calculates Year
//     const currentYear = new Date().getFullYear();
//     this.setState({
//       yearRange: Array.from(
//         { length: currentYear - 1900 + 1 },
//         (_, index) => currentYear - index
//       ),
//     });

//     // This function converts INR to USD
//     const usdConverter = async (inr) => {
//       // Set the API URL and endpoint
//       const apiUrl = "https://api.exchangerate-api.com/v4/latest/INR";
//       // Construct the API URL with the endpoint and input currency code
//       try {
//         const resp = await fetch(apiUrl);
//         const data = await resp.json();
//         return Math.ceil(inr * data.rates.USD);
//       } catch (e) {
//         console.error(e);
//       }
//     };

//     // Fetching Asset Details
//     axios
//       .get(`${this.state.baseurl}/asset`)
//       .then((resp) => {
//         console.log(resp.data);
//         const data = resp.data;
//         if (data && data.length > 0) {
//           let inrSum = 0;
//           // const filteredData = data.filter((n) => n.checkIn !== "-1");
//           data.forEach((asset) => {
//             inrSum += !isNaN(parseInt(asset.cost)) ? parseInt(asset.cost) : 0;
//           });
//           this.setState({
//             assetCount: data.length,
//             availableAssetCount: data.filter(
//               (n) => n.checkIn !== "-1" && n.checkOut == "-1"
//             ).length,
//             assignedAssets: data.filter((n) => n.checkOut !== "-1").length,
//           });
//           // usdConverter(inrSum).then((usd) => this.setState({ assetCost: usd }));
//           this.setState({ assetCost: inrSum });
//         }
//         this.setState({ isAssetApiHitComplete: true });
//       })
//       .catch((e) => {
//         console.error(e);
//         this.setState({ isAssetApiHitComplete: true });
//       });

//     // Fetching Financial Year Cost
//     this.getFinancialYearCost(this.state.fromdate, this.state.todate);
//   }
//   render() {
//     return (
//       <div className={Classes["home-outer-div"]}>
//         <h2>Assets Details</h2>
//         <div className={Classes["dashboard-card-wrapper"]}>
//           <div className={Classes["dashboard-card"]}>
//             <div className="row">
//               <div className="col-9">
//                 <p>All Assets</p>
//                 {this.state.isAssetApiHitComplete ? (
//                   <span className={Classes["number"]}>{this.state.assetCount}</span>
//                 ) : (
//                   <div style={{ margin: "0.6rem 0rem" }}>
//                     <Spinner />
//                   </div>
//                 )}
//               </div>
//               <div className="col-3 d-flex justify-content-end">
//                 <div className={Classes["img-div"]}>
//                   <img src="/assets/images/suitcase.png" alt="" />
//                 </div>
//               </div>
//               <div className="col-6">
//                 <Link to="/list-asset">
//                   <ArrowRightAltIcon />
//                   goto
//                 </Link>
//               </div>
//             </div>
//           </div>
//           <div className="dashboard-card">
//             <div className="row">
//               <div className="col-9">
//                 <p>Total Cost of Assets</p>
//                 {this.state.isAssetApiHitComplete ? (
//                   <span className="number">{this.state.assetCost} &#8377;</span>
//                 ) : (
//                   <div style={{ margin: "0.6rem 0rem" }}>
//                     <Spinner />
//                   </div>
//                 )}
//               </div>
//               <div className="col-3 d-flex justify-content-end">
//                 <div className="img-div">
//                   <img src="/assets/images/dollar-symbol.png" alt="" />
//                 </div>
//               </div>
//               <div className="col-6">
//                 <Link to="/total-cost">
//                   <ArrowRightAltIcon />
//                   goto
//                 </Link>
//               </div>
//             </div>
//           </div>
//           <div className="dashboard-card">
//             <div className="row">
//               <div className="col-9">
//                 <p>Available Assets</p>
//                 {this.state.isAssetApiHitComplete ? (
//                   <span className="number">
//                     {this.state.availableAssetCount}
//                   </span>
//                 ) : (
//                   <div style={{ margin: "0.6rem 0rem" }}>
//                     <Spinner />
//                   </div>
//                 )}
//               </div>
//               <div className="col-3 d-flex justify-content-end">
//                 <div className="img-div">
//                   <img src="/assets/images/check.png" alt="" />
//                 </div>
//               </div>
//               <div className="col-6">
//                 <Link to="/available-asset">
//                   <ArrowRightAltIcon />
//                   goto
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//         <h2>Financial Year</h2>

//         <div className="row mb-3">
//           <div className="col-md-4">
//             <div className="form-group">
//               <label htmlFor="from">From Date</label>
//               <input
//                 id="from"
//                 name="from"
//                 type="date"
//                 className="form-control"
//                 value={this.state.fromdate}
//                 onChange={(e) =>
//                   this.setState({ fromdate: e.target.value }, () => {
//                     this.getFinancialYearCost(
//                       this.state.fromdate,
//                       this.state.todate
//                     );
//                   })
//                 }
//               />
//             </div>
//           </div>
//           <div className="col-md-4">
//             <div className="form-group">
//               <label htmlFor="to">To Date</label>
//               <input
//                 id="to"
//                 name="to"
//                 type="date"
//                 className="form-control"
//                 value={this.state.todate}
//                 onChange={(e) =>
//                   this.setState({ todate: e.target.value }, () => {
//                     this.getFinancialYearCost(
//                       this.state.fromdate,
//                       this.state.todate
//                     );
//                   })
//                 }
//               />
//             </div>
//           </div>
//           {/* <div className="col-md-2">
//             <br />
//             <CTA
//               title="Calculate"
//               onClick={() =>
//                 this.getFinancialYearCost(
//                   this.state.fromdate,
//                   this.state.todate
//                 )
//               }
//             />
//           </div> */}
//         </div>
//         <div className="dashboard-card-wrapper">
//           <div className="dashboard-card">
//             <div className="row">
//               <div className="col-9">
//                 <p>Financial Year Amount</p>
//                 {this.state.isFinancialCostApiHitComplete ? (
//                   <span className="number">
//                     {this.state.financialYearCost} &#8377;
//                   </span>
//                 ) : (
//                   <div style={{ margin: "0.6rem 0rem" }}>
//                     <Spinner />
//                   </div>
//                 )}
//               </div>
//               <div className="col-3 d-flex justify-content-end">
//                 <div className="img-div">
//                   <img src="/assets/images/save-money.png" alt="" />
//                 </div>
//               </div>
//               <div className="col-6">
//                 <Link
//                   to={`/yearwise-asset-cost/${this.state.fromdate}/${this.state.todate}`}
//                 >
//                   <ArrowRightAltIcon />
//                   goto
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
    
//       </div>
//     );
//   }
// }
import React from 'react'

export default function Dashboard() {
  return (
    <div>Dashboard</div>
  )
}
