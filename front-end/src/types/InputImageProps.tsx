type InputImageProps = {
	setSelectedFile: (file: File | null) => void;
	selectedFile: File | null;
	dragOver: boolean;
	type: string;
	imageUrl: string;
};

export type { InputImageProps };