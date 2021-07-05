import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

export const PrettoSlider = withStyles({
    //Slider背景色
    root: {
      color: '#52af77',
      height: 8,
    },
    //Slider上的點
    thumb: {
      height: 15,
      width: 15,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      marginTop: -3,
      '&:focus, &:hover, &$active': {
        boxShadow: 'inherit',
      },
    },
    track: {
      height: 10,
      borderRadius: 4,
    },
    rail: {
      height: 10,
      borderRadius: 4,
    },
  })(Slider);

//圖表Slider刻度
export const sliderMarks = [
    {
      value: 1,
      label: "1",
    },
    {
      value: 2,
      label: "2",
    },
    {
      value: 3,
      label: "3",
    },
    {
      value: 4,
      label: "4",
    },
    {
      value: 5,
      label: "5",
    },
    {
      value: 6,
      label: "6",
    },
    {
      value: 7,
      label: "7",
    },
    {
      value: 8,
      label: "8",
    },
    {
      value: 9,
      label: "9",
    },
    {
      value: 10,
      label: "10",
    },
  ];