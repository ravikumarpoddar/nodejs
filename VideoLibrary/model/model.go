package model

type SubjectRepo struct {
	ID          int    `json:"id"`
	SubjectName string `json:"subname"`
	Desc        string `json:"desc"`
	Thumbnail   string `json:"thumbnail"`
}

type ModuleRepo struct {
	ID        int    `json:"id"`
	ModName   string `json:"modname"`
	About     string `json:"about"`
	Thumbnail string `json:"thumbnail"`
	SubID     int    `json:"subid"`
	Duration  string `json:"duration"`
}

type AddVideoModRepo struct {
	ID        int    `json:"id"`
	Name      string `json:"name"`
	ModID     int    `json:"modid"`
	URL       int    `json:"url"`
	Duration  int    `json:"duration"`
	About     string `json:"about"`
	Thumbnail string `json:"thumbnail"`
}
