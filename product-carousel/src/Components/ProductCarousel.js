import React, { useState, useEffect, useRef } from "react";
import "../Css/CarouselStyles.css";
import rsIcon from "../Images/rs.png";

const ProductCarousel = (props) => {
  const {
    productList,
    img_width,
    img_height,
    visibleImages,
    duration,
    autoNext = false,
    timeForNext = 5000, // auto Next in 5 sec if autoNext=true
  } = props;

  /* Hooks Declarations Start*/
  const [currFirstImg, setCurrFirstImg] = useState(0);
  const [actualFirst, setActualFirst] = useState("");
  const [visibleItemsProps, setVisibleItemsProps] = useState({
    order: [],
    styles: {},
  });

  const currMiddleImgRef = useRef(0);
  const intervalRef = useRef(0);
  const imgDifference = useRef(1);
  const durationRef = useRef(duration);

  let elementsInLeft = 2;
  let elementsInRight = 1;

  const constructVisibleItemsProps = () => {
    const visibleItemsProps = {}; // Store item details visibile in the carousel
    visibleItemsProps.order = [];
    let curr_center = currFirstImg; // Storing the Middle element in focus
    let timesToIterate = 0;
    let zIndex = -1;
    let xTranslate = img_width; // Move the element with respect to x axis
    let zTranslate = 0; // Reduce image size for images except the center

    const division = img_width * (4 / elementsInLeft);

    while (timesToIterate < visibleImages) {
      const styles = {};
      let currImgIndex;
      let currImgIndexOnRight = productList.length > 1 ? true : false;

      if (timesToIterate < elementsInRight) {
        const nextIndex = curr_center - elementsInRight;

        currImgIndex =
          nextIndex > -1 ? nextIndex : productList.length - Math.abs(nextIndex);
        zTranslate = -division * elementsInRight;
        xTranslate = img_width - division * elementsInRight;

        elementsInRight--;
      } else {
        // Set properties for elements in center and to left of it.
        currImgIndexOnRight = false;
        currImgIndex = curr_center;
        if (curr_center + 1 >= productList.length) {
          // Maintains cyclic carousel

          curr_center = 0;
        } else {
          curr_center++;
        }

        zTranslate =
          -division * Math.abs(elementsInLeft - (timesToIterate + 1));
        xTranslate =
          img_width +
          division * Math.abs(elementsInLeft - (timesToIterate + 1));
      }
      // Assigning  values to 'styles' object
      styles.transform =
        "translateX(" + xTranslate + "px) translateZ(" + zTranslate + "px)";

      styles.zIndex = currImgIndexOnRight ? zIndex++ : zIndex--;
      visibleItemsProps.order.push(currImgIndex);
      visibleItemsProps[currImgIndex] = { styles };
      timesToIterate++;
    }
    durationRef.current =
      actualFirst === "" ? duration : duration / imgDifference.current;

    setVisibleItemsProps(visibleItemsProps); // setting state for visible items
  };

  const changeCenter = ({ event, index }) => {
    const currFirstImgIndex = visibleItemsProps.order.indexOf(currFirstImg);

    const prevIndex = visibleItemsProps.order[currFirstImgIndex - 1];

    const nextIndex = visibleItemsProps.order[currFirstImgIndex + 1];

    if (index !== currFirstImg) {
      if (index === prevIndex || index === nextIndex) {
        setCurrFirstImg(index);
      } else {
        const val = currFirstImgIndex - visibleItemsProps.order.indexOf(index);
        imgDifference.current = Math.abs(val);

        setActualFirst(index);

        cycleToNextImage(index);
      }
    }
  };

  const cycleToNextImage = (actual) => {
    if (
      visibleItemsProps.order.indexOf(currMiddleImgRef.current) >
      visibleItemsProps.order.indexOf(actual)
    ) {
      // Right side image click
      currMiddleImgRef.current =
        currMiddleImgRef.current - 1 > -1
          ? currMiddleImgRef.current - 1
          : productList.length - 1; // Right side image click
      setCurrFirstImg(currMiddleImgRef.current);
    } else {
      // Left side image click
      currMiddleImgRef.current =
        currMiddleImgRef.current + 1 < productList.length
          ? currMiddleImgRef.current + 1
          : 0;
      setCurrFirstImg(currMiddleImgRef.current);
    }
  };

  //setInterval()&& clearInterval() allows smoother animation while cycling
  useEffect(() => {
    clearInterval(intervalRef.current);
    if (actualFirst !== "") {
      intervalRef.current = setInterval(() => {
        if (actualFirst !== "" && actualFirst !== currMiddleImgRef.current) {
          cycleToNextImage(actualFirst);
        } else if (
          actualFirst !== "" &&
          actualFirst === currMiddleImgRef.current
        ) {
          setActualFirst("");
          imgDifference.current = 1;
          clearInterval(intervalRef.current);
        }
      }, durationRef.current - 100); // Advance 100ms to begin bringing nextimage for smooth animation
    }
  }, [actualFirst]);

  useEffect(() => {
    constructVisibleItemsProps(); // Constructs  css properties to the elements visible
    currMiddleImgRef.current = currFirstImg; //Guarantees  recent state while accessing though intervals.
  }, [currFirstImg]);

  useEffect(() => {
    if (autoNext) {
      setInterval(() => {
        const nextImg =
          currMiddleImgRef.current + 1 < productList.length
            ? currMiddleImgRef.current + 1
            : 0;
        setCurrFirstImg(nextImg);
      }, timeForNext);
    }
  }, []);
  function Card(props) {
    return <div className="card">{props.children}</div>;
  }
  function Image(props) {
    return (
      <div className="card-image">
        <img src={props.src} />
      </div>
    );
  }

  function Content(props) {
    return (
      <div className="card-content">
        <Title text={props.title} />
        <Description text={props.description} />
      </div>
    );
  }
  function Title(props) {
    return <span className="card-title">{props.text}</span>;
  }

  function Description(props) {
    return (
      <div>
        <img
          src={rsIcon}
          style={{
            height: "10px",
            width: "10px",
            float: "left",
            paddingTop: "4px",
            paddingRight: "3px",
          }}
        ></img>
        <p className="card-description">{props.text}.00</p>
      </div>
    );
  }

  const loadCarousel = () => {
    return (
      <ul className="carouselWrapper">
        {productList.map((product, index) => {
          const doNotShow = visibleItemsProps.order.indexOf(index) === -1; // Does not show images that are out of visibility scope

          const styles = visibleItemsProps[index]
            ? visibleItemsProps[index].styles
            : {};
          return (
            <li
              key={product.id}
              className={"imgWrap " + (doNotShow ? "notShow" : "")}
              style={{
                ...styles,
                position: "absolute",
                transition: `all ${durationRef.current}ms linear `,
              }}
              onClick={(e) => {
                changeCenter({ e, index });
              }}
            >
              <Card>
                <Image
                  src={product.imgsrc[product.name]}
                  alt={"img_" + product.id}
                  width={img_width}
                  height={img_height}
                />
                <Content
                  title={product.productName}
                  description={product.price}
                />
              </Card>
            </li>
          );
        })}
      </ul>
    );
  };

  return <React.Fragment>{loadCarousel()}</React.Fragment>;
};
export default ProductCarousel;
