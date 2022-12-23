import { Router } from "express";
import ScoreCard from "../models/ScoreCard";

const router = Router();

const clear = async () => { 
  try {
      await ScoreCard.deleteMany({});
      return ("Database cleared");
  } catch (e) { 
      throw new Error("Database deletion failed"); 
  }
 
};

router.delete('/cards', async (req, res) => {
  const result = await clear();
  res.json({ message: result });
})

const add = async (name, subject, score) => {
  const existing = await ScoreCard.findOne({ name: name, subject: subject }); 
  if (existing) {
      await ScoreCard.updateOne({ name: name, subject: subject }, { score: score });
      return ("updating");
  }
  else {
      const newScoreCard = new ScoreCard({ name: name, subject: subject, score: score}); 
      return newScoreCard.save();
  }  
};

router.post('/card', async (req, res) => {
    const name = req.body.name;
    const subject = req.body.subject;
    const score = parseInt(req.body.score);

    const card = await add(name, subject, score);
    if(card === 'updating'){
        res.json({ message: `Updating (${name}, ${subject}, ${score})`,card: card });
    } else{
        res.json({ message: `Adding (${name}, ${subject}, ${score})`,card: card });
    } 
})

const query = async (type, queryString) => {
  var nameExisting, subExisting;
  var output = [];
  if(type === 'name'){
      nameExisting = await ScoreCard.find({ name: queryString });
      if(nameExisting.length === 0){
          return false;
      } else {
          for(var i = 0; i < nameExisting.length; i++){
              output[i] = `Found card with name: (${nameExisting[i].name},${nameExisting[i].subject},${nameExisting[i].score})`;
          }
          return output;
      } 
  } else {
      subExisting = await ScoreCard.find({ subject: queryString });
      if(subExisting.length === 0){
          return false;
      } else {
          for(var i = 0; i < subExisting.length; i++){
              output[i] = `Found card with subject: (${subExisting[i].name},${subExisting[i].subject},${subExisting[i].score})`;
          }
          return output;
      }
  }
};

router.get('/cards', async (req, res) => {
    const type = req.query.type;
    const queryString = req.query.queryString;
    const upperType = type.charAt(0).toUpperCase() + type.slice(1);

    const result = await query(type, queryString);
    if(!result)
        res.json({ message: `${upperType} (${queryString}) not found!` });
    else{
        res.json({ messages: result }); 
    }
})

export default router;