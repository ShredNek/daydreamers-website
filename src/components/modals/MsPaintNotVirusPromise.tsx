import { useContext } from "react";
import bliss from "../../assets/images/y2k-resources/mspaint/goat-background.jpg";
import colourBar from "../../assets/images/y2k-resources/mspaint/mspaint_colours.png";
import freeSelect from "../../assets/images/y2k-resources/mspaint/mspaint_tool-01.png";
import rectangleSelect from "../../assets/images/y2k-resources/mspaint/mspaint_tool-02.png";
import eraser from "../../assets/images/y2k-resources/mspaint/mspaint_tool-03.png";
import paintBucketTool from "../../assets/images/y2k-resources/mspaint/mspaint_tool-04.png";
import eyeDropTool from "../../assets/images/y2k-resources/mspaint/mspaint_tool-05.png";
import magnifyingGlassTool from "../../assets/images/y2k-resources/mspaint/mspaint_tool-06.png";
import pencilTool from "../../assets/images/y2k-resources/mspaint/mspaint_tool-07.png";
import paintbrushTool from "../../assets/images/y2k-resources/mspaint/mspaint_tool-08.png";
import sprayCanTool from "../../assets/images/y2k-resources/mspaint/mspaint_tool-09.png";
import textTool from "../../assets/images/y2k-resources/mspaint/mspaint_tool-10.png";
import straightLineTool from "../../assets/images/y2k-resources/mspaint/mspaint_tool-11.png";
import splineTool from "../../assets/images/y2k-resources/mspaint/mspaint_tool-12.png";
import squareTool from "../../assets/images/y2k-resources/mspaint/mspaint_tool-13.png";
import shapeTool from "../../assets/images/y2k-resources/mspaint/mspaint_tool-14.png";
import circleTool from "../../assets/images/y2k-resources/mspaint/mspaint_tool-15.png";
import roundedSquareTool from "../../assets/images/y2k-resources/mspaint/mspaint_tool-16.png";
import { AppContext } from "../../utils/AppContext.tsx";
import { SOCIAL_LINKS } from "../../utils/globals.ts";
import Y2kWindowShell from "../Y2k/Y2kWindowShell.tsx";

const MsPaintNotVirusPromise = () => {
	const { setDialogContent } = useContext(AppContext);

	const closeModal = () => {
		sessionStorage.setItem("has_closed_follow_modal", "true");
		setDialogContent(null);
	};

	const toolData = [
		{ name: "free select", img: freeSelect },
		{ name: "rectangle select", img: rectangleSelect },
		{ name: "eraser", img: eraser },
		{ name: "paint bucket tool", img: paintBucketTool },
		{ name: "eye-drop tool", img: eyeDropTool },
		{ name: "magnifying glass tool", img: magnifyingGlassTool },
		{ name: "pencil tool", img: pencilTool },
		{ name: "paintbrush tool", img: paintbrushTool },
		{ name: "spray can tool", img: sprayCanTool },
		{ name: "text", img: textTool },
		{ name: "straight line tool", img: straightLineTool },
		{ name: "spline tool", img: splineTool },
		{ name: "square tool", img: squareTool },
		{ name: "shape tool", img: shapeTool },
		{ name: "circle tool", img: circleTool },
		{ name: "rounded square tool", img: roundedSquareTool },
	];

	return (
		<Y2kWindowShell
			closeButtonAction={{
				performAction: () => {
					closeModal();
				},
			}}
			windowHeader="untitled - Paint"
		>
			<div className="ms-paint-not-virus-promise">
				<div className="file-options">
					<p>
						<span>F</span>ile
					</p>
					<p>
						<span>E</span>dit
					</p>
					<p>
						<span>V</span>iew
					</p>
					<p>
						<span>I</span>mage
					</p>
					<p>
						<span>O</span>ptions
					</p>
					<p>
						<span>H</span>elp
					</p>
				</div>
				<div className="content-parent">
					<div className="top-level-tools">
						<div className="sidebar">
							<div className="tools">
								{toolData.map((entry) => (
									<button key={entry.name} type="button">
										<img alt={entry.name} draggable={false} src={entry.img} />
									</button>
								))}
							</div>
							<div className="selected-tool"></div>
						</div>
						<div className="canvas">
							<div className="canvas-content-layer">
								<h3>why not follow us everywhere?</h3>
								<button
									className="follow-us"
									onClick={() => {
										open(
											SOCIAL_LINKS.find((s) => s.title === "Linktree")?.href,
											"_blank",
										);
									}}
									type="button"
								>
									<p>click here</p>
									<sub>(we promise it's not a virus)</sub>
								</button>
							</div>
							<div className="img-layer">
								<img alt="Bliss background" className="bliss" src={bliss} />
							</div>
						</div>
					</div>
					<div className="colour-bar">
						<img alt="colour bar" src={colourBar} />
					</div>
				</div>
			</div>
		</Y2kWindowShell>
	);
};

export default MsPaintNotVirusPromise;
