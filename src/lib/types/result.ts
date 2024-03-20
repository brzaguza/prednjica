type EngineRank = {
	SearchEngine: string;
	Rank: number;
	Page: number;
	OnPageRank: number;
};

export type ImageFormat = {
	Height: number;
	Width: number;
};

type ImageResult = {
	Original: ImageFormat;
	Thumbnail: ImageFormat;
	ThumbnailURL: string;
	ThumbnailURLHash: string;
	Source: string;
	SourceURL: string;
};

export type ResultType = {
	URL: string;
	URLHash: string;
	Rank: number;
	Score: number;
	Title: string;
	Description: string;
	EngineRanks: EngineRank[];
	ImageResult: ImageResult;
};

export type ErrorResponseType = {
	message: string;
	value: string;
};
