import React, { Component } from 'react'
import styles from './styles.css'

export default class Sliderko extends Component {

  constructor() {
      super();

      console.log("aee");

      this.div = React.createRef();
      this.mouseInitialX = 0;
      this.moving = false;
  }

  toggleBetweenMobileAndDesk() {
      this.mobileCheck = navigator.userAgent.toLowerCase().indexOf("mobile") >= 0 ? true : false;

      if (this.mobileCheck && this.div.current) {
          this.div.current.classList.add(styles["sliderko-component-mobile"]);
      } else if (this.div.current) {
          this.div.current.classList.remove(styles["sliderko-component-mobile"]);
      };
  }

  componentDidMount() {
      window.addEventListener("resize", () => this.toggleBetweenMobileAndDesk(), false);
      window.addEventListener("scroll", () => this.handleScroll(), false);
      this.toggleBetweenMobileAndDesk.call(this);
  }

  handleScroll() {
      console.log("aee");
  }

  onMouseDown(evt) {
      this.mouseInitialX = evt.clientX;
      if (!this.mobileCheck) this.moving = true;
  }

  onMouseMove(evt) {
      if (this.moving == false) return;

      this.handleScroll();

      let currentXPosition = evt.clientX;
      let moveCalc = this.mouseInitialX - currentXPosition;
      this.div.current.scrollLeft = this.div.current.scrollLeft + moveCalc;
      this.mouseInitialX = currentXPosition;
  }

  onMouseUp(evt) {
      this.moving = false;
  }

  render() {
      return (
          <div
              ref={this.div}
              onMouseDown={(evt) => this.onMouseDown(evt)}
              onMouseMove={(evt) => this.onMouseMove(evt)}
              onMouseUp={(evt) => this.onMouseUp(evt)}
              onMouseLeave={(evt) => this.onMouseUp(evt)}
              className={styles[`sliderko-component`]}
              style={this.props.style}
          >
              {this.props.children}
          </div>
      );
  }
}