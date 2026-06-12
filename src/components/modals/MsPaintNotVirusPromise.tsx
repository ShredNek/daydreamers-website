import { useState } from "react";
import blissHq from "../../assets/images/y2k-resources/mspaint/hq/goat-background.jpg";
import colourBarHq from "../../assets/images/y2k-resources/mspaint/hq/mspaint_colours.png";
import blissLq from "../../assets/images/y2k-resources/mspaint/lq/goat-background.jpeg";
import colourBarLq from "../../assets/images/y2k-resources/mspaint/lq/mspaint_colours.jpeg";
import { SOCIAL_LINKS } from "../../utils/globals.ts";
import LazyImage from "../LazyImage.tsx";
import Y2kWindowShell from "../Y2k/Y2kWindowShell.tsx";
import { MS_PAINT_TOOLS, type MsPaintTool } from "./MsPaintTools.ts";

const MsPaintNotVirusPromise = () => {
	const [isOpen, setIsOpen] = useState(true);
	const [selectedTool, setSelectedTool] = useState<MsPaintTool | null>(null);

	if (!isOpen) {
		return null;
	}

	return (
		<Y2kWindowShell
			closeButtonAction={{
				performAction: () => {
					setIsOpen(false);
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
								{MS_PAINT_TOOLS.map((tool) => (
									<button
										key={tool.name}
										onClick={() => setSelectedTool(tool)}
										type="button"
									>
										<LazyImage
											alt={tool.name}
											draggable={false}
											highQualitySrc={tool.img.hq}
											lowQualitySrc={tool.img.lq}
										/>
									</button>
								))}
							</div>
							<div className="selected-tool">
								{selectedTool ? (
									<img
										alt={selectedTool.name}
										draggable={false}
										src={selectedTool.img.hq}
									/>
								) : null}
							</div>
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
								<LazyImage
									alt="Bliss background"
									className="bliss"
									highQualitySrc={blissHq}
									lowQualitySrc={blissLq}
								/>
							</div>
						</div>
					</div>
					<div className="colour-bar">
						<LazyImage
							alt="colour bar"
							highQualitySrc={colourBarHq}
							lowQualitySrc={colourBarLq}
						/>
					</div>
				</div>
			</div>
		</Y2kWindowShell>
	);
};

export default MsPaintNotVirusPromise;
