import { testGet } from "../api/emailCalls.ts";

export const Sandbox = () => {
	return (
		<div style={{ display: "flex", justifyContent: "center" }}>
			<button
				onClick={() => testGet()}
				style={{
					border: "2px solid black",
					backgroundColor: "white",
					fontSize: "3rem",
					padding: "1rem 2rem",
				}}
				type="button"
			>
				Hi there kiddo
			</button>
		</div>
	);
};
