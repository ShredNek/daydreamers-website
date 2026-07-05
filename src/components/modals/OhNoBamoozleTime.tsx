import zakboozled from "../../assets/images/misc/zakboozled.jpg";
import Y2kWindowShell from "../Y2k/Y2kWindowShell.tsx";

const OhNoBamboozleTime = () => {
	return (
		<Y2kWindowShell windowHeader="Zak bamboozled you!">
			<div className="oh-no-bamboozle-time">
				<div className="container-parent">
					<img
						alt="Error. You have not subscribed to our mailing list."
						src={zakboozled}
					/>
					<div className="content-container">
						<h3>oopsies! you just got bamboozled by the wild zork</h3>
						<p>you're gonna have to think your way out of this one, bud!</p>
					</div>
				</div>
			</div>
		</Y2kWindowShell>
	);
};

export default OhNoBamboozleTime;
