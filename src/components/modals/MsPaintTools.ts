import freeSelectHq from "../../assets/images/y2k-resources/mspaint/hq/mspaint_tool-01.png";
import rectangleSelectHq from "../../assets/images/y2k-resources/mspaint/hq/mspaint_tool-02.png";
import eraserHq from "../../assets/images/y2k-resources/mspaint/hq/mspaint_tool-03.png";
import paintBucketToolHq from "../../assets/images/y2k-resources/mspaint/hq/mspaint_tool-04.png";
import eyeDropToolHq from "../../assets/images/y2k-resources/mspaint/hq/mspaint_tool-05.png";
import magnifyingGlassToolHq from "../../assets/images/y2k-resources/mspaint/hq/mspaint_tool-06.png";
import pencilToolHq from "../../assets/images/y2k-resources/mspaint/hq/mspaint_tool-07.png";
import paintbrushToolHq from "../../assets/images/y2k-resources/mspaint/hq/mspaint_tool-08.png";
import sprayCanToolHq from "../../assets/images/y2k-resources/mspaint/hq/mspaint_tool-09.png";
import textToolHq from "../../assets/images/y2k-resources/mspaint/hq/mspaint_tool-10.png";
import straightLineToolHq from "../../assets/images/y2k-resources/mspaint/hq/mspaint_tool-11.png";
import splineToolHq from "../../assets/images/y2k-resources/mspaint/hq/mspaint_tool-12.png";
import squareToolHq from "../../assets/images/y2k-resources/mspaint/hq/mspaint_tool-13.png";
import shapeToolHq from "../../assets/images/y2k-resources/mspaint/hq/mspaint_tool-14.png";
import circleToolHq from "../../assets/images/y2k-resources/mspaint/hq/mspaint_tool-15.png";
import roundedSquareToolHq from "../../assets/images/y2k-resources/mspaint/hq/mspaint_tool-16.png";
import freeSelectLq from "../../assets/images/y2k-resources/mspaint/lq/mspaint_tool-01.jpeg";
import rectangleSelectLq from "../../assets/images/y2k-resources/mspaint/lq/mspaint_tool-02.jpeg";
import eraserLq from "../../assets/images/y2k-resources/mspaint/lq/mspaint_tool-03.jpeg";
import paintBucketToolLq from "../../assets/images/y2k-resources/mspaint/lq/mspaint_tool-04.jpeg";
import eyeDropToolLq from "../../assets/images/y2k-resources/mspaint/lq/mspaint_tool-05.jpeg";
import magnifyingGlassToolLq from "../../assets/images/y2k-resources/mspaint/lq/mspaint_tool-06.jpeg";
import pencilToolLq from "../../assets/images/y2k-resources/mspaint/lq/mspaint_tool-07.jpeg";
import paintbrushToolLq from "../../assets/images/y2k-resources/mspaint/lq/mspaint_tool-08.jpeg";
import sprayCanToolLq from "../../assets/images/y2k-resources/mspaint/lq/mspaint_tool-09.jpeg";
import textToolLq from "../../assets/images/y2k-resources/mspaint/lq/mspaint_tool-10.jpeg";
import straightLineToolLq from "../../assets/images/y2k-resources/mspaint/lq/mspaint_tool-11.jpeg";
import splineToolLq from "../../assets/images/y2k-resources/mspaint/lq/mspaint_tool-12.jpeg";
import squareToolLq from "../../assets/images/y2k-resources/mspaint/lq/mspaint_tool-13.jpeg";
import shapeToolLq from "../../assets/images/y2k-resources/mspaint/lq/mspaint_tool-14.jpeg";
import circleToolLq from "../../assets/images/y2k-resources/mspaint/lq/mspaint_tool-15.jpeg";
import roundedSquareToolLq from "../../assets/images/y2k-resources/mspaint/lq/mspaint_tool-16.jpeg";

export type MsPaintTool = {
	name: string;
	img: {
		lq: string;
		hq: string;
	};
};

export const MS_PAINT_TOOLS: MsPaintTool[] = [
	{
		name: "free select",
		img: {
			lq: freeSelectLq,
			hq: freeSelectHq,
		},
	},
	{
		name: "rectangle select",
		img: {
			lq: rectangleSelectLq,
			hq: rectangleSelectHq,
		},
	},
	{
		name: "eraser",
		img: {
			lq: eraserLq,
			hq: eraserHq,
		},
	},
	{
		name: "paint bucket tool",
		img: {
			lq: paintBucketToolLq,
			hq: paintBucketToolHq,
		},
	},
	{
		name: "eye-drop tool",
		img: {
			lq: eyeDropToolLq,
			hq: eyeDropToolHq,
		},
	},
	{
		name: "magnifying glass tool",
		img: {
			lq: magnifyingGlassToolLq,
			hq: magnifyingGlassToolHq,
		},
	},
	{
		name: "pencil tool",
		img: {
			lq: pencilToolLq,
			hq: pencilToolHq,
		},
	},
	{
		name: "paintbrush tool",
		img: {
			lq: paintbrushToolLq,
			hq: paintbrushToolHq,
		},
	},
	{
		name: "spray can tool",
		img: {
			lq: sprayCanToolLq,
			hq: sprayCanToolHq,
		},
	},
	{
		name: "text",
		img: {
			lq: textToolLq,
			hq: textToolHq,
		},
	},
	{
		name: "straight line tool",
		img: {
			lq: straightLineToolLq,
			hq: straightLineToolHq,
		},
	},
	{
		name: "spline tool",
		img: {
			lq: splineToolLq,
			hq: splineToolHq,
		},
	},
	{
		name: "square tool",
		img: {
			lq: squareToolLq,
			hq: squareToolHq,
		},
	},
	{
		name: "shape tool",
		img: {
			lq: shapeToolLq,
			hq: shapeToolHq,
		},
	},
	{
		name: "circle tool",
		img: {
			lq: circleToolLq,
			hq: circleToolHq,
		},
	},
	{
		name: "rounded square tool",
		img: {
			lq: roundedSquareToolLq,
			hq: roundedSquareToolHq,
		},
	},
] as const;
