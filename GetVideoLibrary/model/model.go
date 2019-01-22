package model

type GetSubj struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	Thumbnail   string `json:"thumbnail"`
	CreatedDate string `json:"createdOn"`
	About       string `json:"about"`
	CreatedBy   string `json:"createdby"`
	CreatorName string `json:"creatorname"`
	IsPub       bool   `json:"ispublished"`
}

type GetMod struct {
	ID          int    `json:"id"`
	SubID       int    `json:"subid"`
	Name        string `json:"name"`
	Duration    string `json:"duration"`
	Thumbnail   string `json:"thumbnail"`
	CreatedDate string `json:"createdOn"`
	About       string `json:"about"`
	CreatedBy   string `json:"createdby"`
	CreatorName string `json:"creatorname"`
	IsPub       bool   `json:"ispublished"`
}

type GetVideoMod struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	ModID       int    `json:"modid"`
	URL         int    `json:"url"`
	Duration    int    `json:"duration"`
	About       string `json:"about"`
	Thumbnail   string `json:"thumbnail"`
	CreatedBy   string `json:"createdby"`
	CreatorName string `json:"creatorname"`
	CreatedDate string `json:"createdOn"`
}
