import { generateTemporaryOfficeFile, initializeGitRepository, stageGitFile, invokePowerShellScript } from '../util.mjs';

export default async function() {
	const { directoryPath, filePath } = await generateTemporaryOfficeFile('docx', word => {
		const paragraph = word.createP();
		paragraph.addText('Hello, World!');
	});

	await initializeGitRepository(directoryPath);
	await stageGitFile(filePath, directoryPath);
	await invokePowerShellScript(directoryPath);
	// TODO: Remember date of `word/document.xml.txt`
	await invokePowerShellScript(directoryPath);
	// TODO: Compare date of `word/document.xml.txt`
}
