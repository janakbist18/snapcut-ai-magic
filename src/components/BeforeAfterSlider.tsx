import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";

interface BeforeAfterSliderProps {
  original: string;
  processed: string;
}

const BeforeAfterSlider = ({ original, processed }: BeforeAfterSliderProps) => {
  return (
    <div className="rounded-2xl overflow-hidden border border-border/50 glass-card">
      <ReactCompareSlider
        itemOne={<ReactCompareSliderImage src={original} alt="Original" />}
        itemTwo={
          <div className="w-full h-full" style={{ backgroundImage: "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\"><rect width=\"10\" height=\"10\" fill=\"%23333\"/><rect x=\"10\" y=\"10\" width=\"10\" height=\"10\" fill=\"%23333\"/><rect x=\"10\" width=\"10\" height=\"10\" fill=\"%23222\"/><rect y=\"10\" width=\"10\" height=\"10\" fill=\"%23222\"/></svg>')" }}>
            <ReactCompareSliderImage src={processed} alt="Processed" style={{ background: "transparent" }} />
          </div>
        }
        style={{ height: "400px" }}
      />
    </div>
  );
};

export default BeforeAfterSlider;
