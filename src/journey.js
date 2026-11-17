import {bi} from './data/catalog.js';
export const freshJourney=()=>({started:false,tier:'gold',stage:'discover',channel:null,result:null,trail:[],ending:null,mode:'current',narrative:false,zoom:1,reviewed:[],explored:[],profiles:{},starting:'new'});
export function getActions(data,tier,stage){
 const scene=data.scenes.find(x=>x.id===stage);if(!scene)return [];
 if(tier==='gold'&&stage==='relationship')return[
  {id:'gold-assisted',channel:'phone',title:bi('Use the assisted support path','استخدام مسار الدعم بالمساعدة'),response:bi('Gold has no dedicated RM under the working proposition. The appropriate assisted route needs clear recognition, ownership and escalation; RM absence is not a failure.','لا مدير مخصص للذهبي وفق التصور المبدئي. يحتاج مسار المساعدة المناسب لتعرّف واضح ومسؤولية وتصعيد؛ غياب المدير ليس إخفاقًا.'),nextChannel:'phone',repeat:false,kind:'unknown'},
  {id:'gold-branch',channel:'branch',title:bi('Ask for branch assistance','طلب مساعدة الفرع'),response:bi('A branch is an assisted contact route. Current service scope, recognition and resolver ownership need validation by task.','الفرع مسار مساعدة. يحتاج نطاق الخدمة والتعرّف ومسؤولية المعالجة للتحقق حسب المهمة.'),nextChannel:'branch',repeat:false,kind:'unknown'}
 ];
 let a=scene.actions.filter(x=>!(tier==='gold'&&(x.channel==='rm'||x.nextChannel==='rm'||x.id==='link-family')));
 if(stage==='discover'){const first=tier==='gold'?['open-app','browse-site','visit-branch']:tier==='platinum'?['open-app','contact-rm','call-first']:['visit-branch','contact-rm','browse-site'];a=first.map(id=>a.find(x=>x.id===id)).filter(Boolean);}
 if(stage==='value'){const order=tier==='gold'?['card-finance','inspect-value']:tier==='elite'?['treasury-value','inspect-value']:['inspect-value','treasury-value'];a=order.map(id=>a.find(x=>x.id===id)).filter(Boolean);}
 if(stage==='daily'&&tier==='gold')a=['card-counter','statement','kiosk-task'].map(id=>a.find(x=>x.id===id)).filter(Boolean);
 if(stage==='privileges')a=a.filter(x=>x.id==='before-travel'||(tier==='gold'?x.id==='lounge':tier==='platinum'?x.id==='concierge':x.id==='concierge')).map(x=>tier==='elite'&&x.id==='concierge'?{...x,title:bi('Inspect a reported partner experience','فحص تجربة شريك مُبلّغ عنها'),response:bi('A Platinum concierge account is cross-tier context, not evidence of Elite entitlement. Elite partner scope, conditions and recovery require separate confirmation.','رواية كونسيرج البلاتيني سياق للمقارنة، وليست دليل استحقاق النخبة. يلزم تأكيد مستقل لنطاق شركاء النخبة وشروطهم ومعالجتهم.'),kind:'unknown'}:x);
 return a;
}
export function resolveAction(data,journey,actionId){
 const action=getActions(data,journey.tier,journey.stage).find(a=>a.id===actionId);
 if(!action)throw new Error('Unknown action for tier / stage');
 return{...structuredClone(action),previousChannel:journey.channel,stage:journey.stage,tier:journey.tier,proposal:journey.mode==='future',contextTransfer:'unverified'};
}
export function commitResult(journey){if(!journey.result)return journey;const r=journey.result;return{...journey,channel:r.nextChannel,trail:[...journey.trail,{stage:journey.stage,tier:journey.tier,actionId:r.id,channel:r.channel,nextChannel:r.nextChannel,previousChannel:r.previousChannel,repeat:r.repeat,proposal:r.proposal,contextTransfer:'unverified'}],result:null};}
export function nextStage(data,tier,stage){const route=data.routes[tier];const i=route.indexOf(stage);return i===-1?'debrief':route[Math.min(i+1,route.length-1)];}
export function changeTier(journey,tier){return{...journey,tier,result:null,channel:journey.channel==='rm'&&tier==='gold'?'phone':journey.channel};}
export function goBack(journey){if(!journey.trail.length)return{...journey,result:null,stage:'discover'};const trail=[...journey.trail];const old=trail.pop();return{...journey,tier:old.tier,stage:old.stage,channel:old.previousChannel,trail,result:null,ending:null};}
export function shareHash(state){const p=new URLSearchParams({view:state.view,tier:state.journey.tier,stage:state.journey.stage,lang:state.lang,mode:state.journey.mode});return '#'+p;}
export function parseHash(hash,data){const p=new URLSearchParams(hash.replace(/^#/,''));const views=['home','journey','evidence','gaps','plan','governance','editor'];return{view:views.includes(p.get('view'))?p.get('view'):'home',tier:['gold','platinum','elite'].includes(p.get('tier'))?p.get('tier'):'gold',stage:data.stages.some(s=>s.id===p.get('stage'))?p.get('stage'):'discover',lang:p.get('lang')==='ar'?'ar':'en',mode:p.get('mode')==='future'?'future':'current'};}
export function emphasis(profile,starting){if(starting==='urgent')return'urgentEmphasis';if(profile?.digital==='low')return'lowDigital';if(profile?.life==='travel')return'travelEmphasis';if(profile?.life==='family')return'familyEmphasis';if(profile?.banking==='multi'||starting==='switching')return'multiEmphasis';return'standardEmphasis';}

export function entryPosition(channel){return {app:{x:13,y:33},website:{x:25,y:34},branch:{x:8,y:34},phone:{x:20,y:33},rm:{x:25,y:33}}[channel]||{x:13,y:19};}
