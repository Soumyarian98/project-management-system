import CreateProjectDialog from "./_components/CreateProjectDialog";

export default function Home() {
	return (
		<div className="flex justify-between items-center mb-4 md:mb-6">
			<h1 className="text-lg md:text-2xl font-bold">
				Product Design Development
			</h1>

			<CreateProjectDialog />
		</div>
	);
}
