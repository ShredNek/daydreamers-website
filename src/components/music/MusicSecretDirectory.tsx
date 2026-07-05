const MusicSecretDirectory = ({ onClick }: { onClick: () => void }) => (
	<div className="secret-directory-container">
		<div className="content">
			<p>hey buddy.</p>
			<br />
			<p>ur not from around here are ya?</p>
			<br />
			<p>here's a copy of some unreleased music!! virus free we promise</p>
		</div>
		<button onClick={onClick} type="button">
			secret songs
		</button>
	</div>
);

export default MusicSecretDirectory;
