import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { AccessToken } from 'livekit-server-sdk';
const app = express();
app.use(cors());
app.use(express.json());
const { LIVEKIT_URL, LIVEKIT_API_KEY, LIVEKIT_API_SECRET } = process.env;
app.get('/health', (_req,res)=>res.json({ok:true,service:'AYAH CHAT voice token server'}));
app.post('/token', async (req,res)=>{
 try {
  if(!LIVEKIT_URL || !LIVEKIT_API_KEY || !LIVEKIT_API_SECRET) return res.status(503).json({error:'Voice service is not configured'});
  const roomName=String(req.body?.roomName||'').trim();
  const identity=String(req.body?.identity||'').trim();
  if(!roomName||!identity||roomName.length>80||identity.length>80) return res.status(400).json({error:'Valid roomName and identity are required'});
  // TODO before public launch: verify signed-in user and authorize room access.
  const token=new AccessToken(LIVEKIT_API_KEY,LIVEKIT_API_SECRET,{identity,ttl:'15m'});
  token.addGrant({roomJoin:true,room:roomName,canPublish:true,canSubscribe:true});
  res.json({serverUrl:LIVEKIT_URL,participantToken:await token.toJwt()});
 } catch(err) { console.error(err); res.status(500).json({error:'Could not create voice token'}); }
});
const port=Number(process.env.PORT||3000);
app.listen(port,()=>console.log(`AYAH CHAT server listening on ${port}`));
