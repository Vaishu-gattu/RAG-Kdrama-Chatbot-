from pydantic import BaseModel

class KDramaRecommendation(BaseModel):
    title: str
    description: str
    genre: str
    year: str
