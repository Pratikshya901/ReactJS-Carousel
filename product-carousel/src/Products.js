import React, { Component } from "react";
import catalog from "./Components/ProductCatalog";
import ProductCarousel from "./Components/ProductCarousel";
import "./Css/ProductStyles.css";

import styled from "styled-components";

const Separator = styled.div`
  border-bottom: 1px solid #e5e5e5;
  height: 1px;
`;

const Checkbox = (props) => <input type="checkbox" {...props} />;

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: catalog,
      error: "",
      isfilterClicked: false,
      showDiv: false,
      selectedVal: [],
      isChecked: false,
    };
  }

  handleCheckboxChange = (option) => {
    var array = [...this.state.selectedVal]; // make a separate copy of the array
    let index = array.indexOf(option.value.item);

    if (index !== -1) {
      array.splice(index, 1);
      this.setState({
        selectedVal: array,
      });
    } else {
      this.setState((prevState) => ({
        selectedVal: [...prevState.selectedVal, option.value.item],
      }));
    }
  };

  handleFilterClick = (e) => {
    const { productList, selectedVal } = this.state;

    let filteredProductList = [];

    if (selectedVal.length > 0) {
      catalog.filter((product) =>
        selectedVal.includes(product.catagory)
          ? filteredProductList.push(product)
          : ""
      );
      this.setState({
        productList: filteredProductList,
      });
    } else {
      this.setState({
        productList: catalog,
      });
    }
    this.cancel();
  };
  buttonClicked = () => {
    this.setState({ showDiv: true });
  };
  cancel = () => {
    this.setState({
      showDiv: false,
    });
  };

  render() {
    const { selectedVal, productList, showDiv } = this.state;

    const optn = [...new Set(catalog.map((product) => product.catagory))];
    const optionList =
      optn.length > 0 &&
      optn.map((item, i) => {
        return { key: { i }, value: { item }, lebel: { item } };
      });

    return (
      <div className="App">
        <h1 className="h1">Featured Products</h1>
        <div style={{ width: "20%", float: "right" }}>
          <button className="categoryBtn" onClick={() => this.buttonClicked()}>
            {" "}
            Filter By Catagory
          </button>
          {showDiv ? (
            <div
              style={{
                width: "200px",
                backgroundColor: "white",
                marginRight: "20px",
                position: "absolute",
                textAlign: "left",
              }}
              ref={this.wrapperRef}
            >
              {optionList.map((opt) => {
                return (
                  <label>
                    <ul>
                      <Checkbox
                        checked={this.state.selectedVal.includes(
                          opt.value.item
                        )}
                        onChange={(e) => this.handleCheckboxChange(opt)}
                      />

                      <span>{opt.value.item}</span>
                    </ul>
                    <Separator />
                  </label>
                );
              })}

              <div>
                <button className="selectionBtn" onClick={() => this.cancel()}>
                  CANCEL
                </button>
                <button
                  className="selectionBtn"
                  onClick={() => this.handleFilterClick()}
                >
                  APPLY
                </button>
              </div>
            </div>
          ) : null}
        </div>

        {catalog.length === 0 && <div>Loading...</div>}
        {catalog.length > 0 && (
          <ProductCarousel
            productList={productList}
            img_width={300}
            img_height={300}
            visibleImages={3}
            duration={750}
          />
        )}
      </div>
    );
  }
}

export default Products;
