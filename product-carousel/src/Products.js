import "./Css/ProductStyles.css";
import apple from "./Images/apple.png";
import book1 from "./Images/book1.png";
import { Component } from "react";

class Products extends Component {
  render() {
    return (
      <div className="App">
        <head> Best Selling Products</head>
        <body>
          <img class="image-class" src={apple} alt="apple Product" />
          <img class="image-class" src={book1} alt="Book1" />
        </body>
      </div>
    );
  }
}
export default Products;
