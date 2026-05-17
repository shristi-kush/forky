import React from "react";
import { ReactComponent as Community } from "../../assets/comm.svg";
import { ReactComponent as Book } from "../../assets/book.svg";
import { ReactComponent as Tips } from "../../assets/tips.svg";
import img1 from "../../assets/winImg1.png";
import img2 from "../../assets/winImg2.png";
import img3 from "../../assets/winImg3.png";
import img4 from "../../assets/winImg4.png";
import app1 from "../../assets/app1.png";
import app2 from "../../assets/app2.png";
import app3 from "../../assets/app3.png";
import app4 from "../../assets/app4.png";

export const siteCardData = [
  {
    svg: <Book height={40} width={40} />,
    heading: "Over 100+",
    desc: "recipes from around the world",
  },
  {
    svg: <Tips height={40} width={40} />,
    heading: "Cooking tips",
    desc: "to help you improve your cooking skills",
  },
  {
    svg: <Community height={40} width={40} />,
    heading: "Communities",
    desc: "to share and get closer with people",
  },
];

export const windowData = [
  {
    radius: "3em 1em 3em 1em",
    img: img1,
    top: "20%",
    left: "-40%",
    numbers: "150+",
    desc: "Baking recipes",
  },
  {
    radius: "1em 3em 1em 3em",
    img: img2,
    top: "50%",
    right: "-50%",
    numbers: "100+",
    desc: "protien rich recipes",
  },
  {
    radius: "1em 3em 1em 3em",
    img: img3,
    left: "-40%",
    bottom: "40%",
    numbers: "120+",
    desc: "morning recipes",
  },
  {
    radius: "3em 1em 3em 1em",
    img: img4,
    top: "50%",
    right: "-50%",
    numbers: "200+",
    desc: "recipes for sweet tooths",
  },
];
export const hacks = [
  {
    radius: "1em 0 0 1em",
    top: "15%",
    left: "10%",
    heading: "500k+",
    padding: "1em 2em",
    desc: "members",
  },
  {
    radius: "0 4em 1em 0",
    top: "15%",
    left: "19%",
    width: "10%",
    heading: "1k+",
    padding: "1em 2em",
    desc: "recipes",
  },
  {
    radius: "1em 1em 5em 5em",
    bottom: "20%",
    height: "15%",
    width: "20%",
    descFontSize: "12px",
    padding: "1em 2em",
    textAlign: "center",
    desc: " Join the community and learn from 100k+ professional chefs with over 10 years of experience in making Delicious food!",
  },
];

export const windowData2 = [
  {
    radius: "3em 1em 3em 1em",
    img: app1,
    top: "20%",
    left: "-40%",
    numbers: "150+",
    desc: "Create & share",
  },
  {
    radius: "1em 3em 1em 3em",
    img: app2,
    top: "50%",
    right: "-50%",
    numbers: "100+",
    desc: "Edit or delete your recepies",
  },
  {
    radius: "1em 3em 1em 3em",
    img: app3,
    left: "-40%",
    bottom: "40%",
    numbers: "120+",
    desc: "Simple ingredients",
  },
  {
    radius: "3em 1em 3em 1em",
    img: app4,
    top: "50%",
    right: "-50%",
    numbers: "200+",
    desc: "easy to follow steps",
  },
];
