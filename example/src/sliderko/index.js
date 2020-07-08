import React, {
  Component
} from 'react'
import './styles.css'

export default class Sliderko extends Component {

  constructor() {
    super();

    this.div = React.createRef();
    this.mouseInitialX = 0;
    this.mouseX = 0;
    this.moving = false;
    this.initialTime = 0;
  }

  toggleBetweenMobileAndDesk() {
    this.mobileCheck = navigator.userAgent.toLowerCase().indexOf("mobile") >= 0 ? true : false;

    if (this.mobileCheck && this.div.current) {
      this.div.current.classList.add("sliderko-component-mobile");
    } else if (this.div.current) {
      this.div.current.classList.remove("sliderko-component-mobile");
    };
  }

  componentDidMount() {
    window.addEventListener("resize", () => this.toggleBetweenMobileAndDesk(), false);
    this.div.current.addEventListener("scroll", () => this.handleScroll(), false);

    this.toggleBetweenMobileAndDesk.call(this);
    this.handleInfinite();
  }

  handleScroll() {
    if (this.props.infinite === true) {
      this.handleInfinite();
    }
  }

  handleInfinite() {
    const lastChild = this.div.current.lastElementChild;
    const scrollLeft = this.div.current.scrollLeft;
    const clientWidth = this.div.current.clientWidth;
    const offsetLeft = lastChild.offsetLeft;
    const rightCheck = clientWidth + scrollLeft;

    if (rightCheck >= offsetLeft) {
      [...this.div.current.childNodes].reverse().forEach((item) => {
        if (!(item == lastChild)) {
          let clone = item.cloneNode(true);
          this.div.current.appendChild(clone);
        }
      })
    };

    const firstElementChild = this.div.current.firstElementChild;
    const firstElementChildClientWidth = firstElementChild.clientWidth;
    const leftCheck = firstElementChildClientWidth * 2;

    if (scrollLeft <= leftCheck) {
      [...this.div.current.childNodes].reverse().some((item) => {

        if ((item == firstElementChild)) { 
          return true
        }

        let clone = item.cloneNode(true);
        this.div.current.insertBefore(clone, this.div.current.firstElementChild);
        const scroll = item.clientWidth + 32;

        this.div.current.scrollLeft += scroll;
      })
    };
  }

  onMouseDown(evt) {
    clearInterval(this.animationInterval);
    this.mouseInitialX = evt.clientX;
    this.mouseX = evt.clientX;
    this.initialTime = Date.now();
    if (!this.mobileCheck) this.moving = true;
  }

  onMouseMove(evt) {
    if (this.moving == false) return;

    let currentXPosition = evt.clientX;
    let moveCalc = this.mouseX - currentXPosition;
    this.div.current.scrollLeft = this.div.current.scrollLeft + moveCalc;
    this.mouseX = currentXPosition;
  }

  onMouseUp(evt) {
    if (this.moving == true) this.accelerateSlider(evt.clientX)
    this.moving = false;
  }

  accelerateSlider(clientX) {    
    
    let currentXPosition = clientX;
    let finishTime = Date.now();
    let distance = this.mouseInitialX - currentXPosition;
    let direction = 'right';

    if (Math.sign(distance) == -1) {
      distance = Math.abs(distance);
      direction = 'left';
    }

    let time = (finishTime - this.initialTime) / 1000;
    let speed = (distance / time) / 100;
    let reduction = 0.3;

    this.animationInterval = setInterval(() => {

      if (direction == 'left') {
        this.div.current.scrollLeft -= speed;
      } else {
        this.div.current.scrollLeft += speed;
      }

      speed -= reduction;

      if (speed < 1) {
        clearInterval(this.animationInterval);
      }
    })
  }

  render() {
    return ( 
      <div 
        ref = {this.div}
        onMouseDown = {(evt) => this.onMouseDown(evt)}
        onMouseMove = {(evt) => this.onMouseMove(evt)}
        onMouseUp = {(evt) => this.onMouseUp(evt)}
        onMouseLeave = {(evt) => this.onMouseUp(evt)}
        className = {`sliderko-component`}
        style = {this.props.style} 
      >
        {this.props.children} 
      </div>
    );
  }
}
