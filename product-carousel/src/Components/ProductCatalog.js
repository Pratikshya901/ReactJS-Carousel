import "../Css/ProductStyles.css";
import apple from "../Images/apple.png";
import samsung from "../Images/samsung.png";
import book1 from "../Images/book1.png";
import book2 from "../Images/book2.png";
import book3 from "../Images/book3.png";
import book4 from "../Images/book4.png";
import bose from "../Images/bose.png";
import Blueheadphone from "../Images/Blueheadphone.png";
import wiredHeadphone from "../Images/wiredHeadphone.png";

const catalog = [
  {
    imgsrc: { apple },
    name: "apple",
    productName: "iPhone 11",
    price: 65000,
    catagory: "mobile",
    id: 0,
  },
  {
    imgsrc: { samsung },
    name: "samsung",
    productName: "Samsung Galaxy",
    price: 29999,
    catagory: "mobile",
    id: 1,
  },
  {
    imgsrc: { book1 },
    name: "book1",
    productName: "The Alchemist",
    price: 599,
    catagory: "book",
    id: 2,
  },
  {
    imgsrc: { book2 },
    name: "book2",
    productName: "The Monk Who Sold His Ferrai",
    price: 265,
    catagory: "book",
    id: 3,
  },
  {
    imgsrc: { book3 },
    name: "book3",
    productName: "To Kill a Mocking Bird",
    price: 505,
    catagory: "book",
    id: 4,
  },
  {
    imgsrc: { book4 },
    name: "book4",
    productName: "Harry Porter",
    price: 1599,
    catagory: "book",
    id: 5,
  },

  {
    imgsrc: { bose },
    name: "bose",
    productName: "Head Phone - Bose",
    price: 9999,
    catagory: "headphones",
    id: 7,
  },
  {
    imgsrc: { Blueheadphone },
    name: "Blueheadphone",
    productName: "Blue Head Phone - Random",
    price: 2599,
    catagory: "headphones",
    id: 8,
  },
  {
    imgsrc: { wiredHeadphone },
    name: "wiredHeadphone",
    productName: "Ear Phone - wired",
    price: 399,
    catagory: "headphones",
    id: 9,
  },
];

export default catalog;
