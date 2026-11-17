import {collections} from './data/index.js';
export function validateDataset(data){
 const fail=m=>{throw new Error(m)};
 if(!data||typeof data!=='object'||Array.isArray(data))fail('Dataset must be a JSON object.');
 if(data.schemaVersion!==1||data.datasetType!=='presentation-demo')fail('Expected schemaVersion 1 and datasetType presentation-demo.');
 if(new TextEncoder().encode(JSON.stringify(data)).byteLength>2000000)fail('Dataset exceeds 2 MB safety limit.');
 let count=0;
 function walk(value,depth=0){if(depth>18)fail('Data nesting exceeds limit.');if(typeof value==='string'&&value.length>20000)fail('Text field exceeds 20,000 characters.');if(value&&typeof value==='object'){for(const [k,v]of Object.entries(value)){if(['__proto__','constructor','prototype'].includes(k))fail('Unsafe JSON key.');walk(v,depth+1);}}}walk(data);
 for(const key of collections){if(!Array.isArray(data[key])||data[key].length>1000)fail(`Invalid collection: ${key}`);const ids=new Set();for(const r of data[key]){if(!r||typeof r!=='object'||typeof r.id!=='string'||!/^[A-Za-z0-9][A-Za-z0-9_-]{0,59}$/.test(r.id)||ids.has(r.id))fail(`Invalid or duplicate stable ID in ${key}`);ids.add(r.id);count++;}}
 if(count>3500)fail('Too many records.');
 for(const key of collections)if(!data[key].length)fail(`Collection cannot be empty: ${key}`);
 for(const key of ['reportedInterviews','reportedPainEntries'])if(!Number.isSafeInteger(data.meta?.[key])||data.meta[key]<0)fail(`Invalid inventory count: ${key}`);
 for(const tier of data.tiers){if(typeof tier.salary!=='number'||typeof tier.deposit!=='number'||!Number.isFinite(tier.salary)||!Number.isFinite(tier.deposit)||typeof tier.rm!=='boolean')fail('Tier references must be finite numbers and RM a boolean.');}
 const mustKeep={stages:['discover','qualify','welcome','daily','relationship','value','privileges','resolve','family','grow','lifecycle','debrief'],gaps:Array.from({length:14},(_,i)=>'G'+String(i+1).padStart(2,'0')),personas:['noura','khalid','abdullah']};
 for(const [key,required]of Object.entries(mustKeep))for(const id of required)if(!data[key].some(r=>r.id===id))fail(`Retain seeded stable ID ${id} in ${key}`);

 const ids=key=>new Set(data[key].map(x=>x.id));
 const has=(key,id)=>ids(key).has(id);
 const refs=(r,key,target)=>{if(r[key]!=null){if(!Array.isArray(r[key])||r[key].some(x=>typeof x!=='string'||!has(target,x)))fail(`Invalid ${key} reference in ${r.id}`)}};
 const scalar=(r,key,target)=>{if(r[key]!=null&&!has(target,r[key]))fail(`Invalid ${key} in ${r.id}`)};
 const text=(r,key)=>{const v=r[key];if(!v||typeof v.en!=='string'||typeof v.ar!=='string')fail(`Bilingual ${key} required in ${r.id}`)};
 const enums={validationStatus:['reported','validated','historical','hypothesis','missing'],capabilityStatus:['available','partial','unavailable','unknown','na'],researchCompleteness:['sufficient','partial','needed'],evidenceType:['customer','staff','observation','historical','operational','cx','illustrative'],lifecycle:['current','future'],valueLabel:['confirmed','card','standard','discretionary','unknown','na']};
 for(const key of collections)for(const r of data[key]){
  if('title'in r)text(r,'title');if('name'in r)text(r,'name');
  refs(r,'tierScope','tiers');refs(r,'stageIds','stages');refs(r,'touchpointIds','touchpoints');refs(r,'productIds','products');refs(r,'linkedGapIds','gaps');refs(r,'sourceIds','evidence');refs(r,'supportingFindingIds','findings');refs(r,'evidenceIds','evidence');refs(r,'dependencies','dependencies');
  scalar(r,'owner','owners');scalar(r,'tier','tiers');scalar(r,'personaId','personas');scalar(r,'chapter','chapters');scalar(r,'proposedOwner','owners');scalar(r,'sourceId','evidence');scalar(r,'stageId','stages');
  for(const [field,values]of Object.entries(enums))if(r[field]!=null&&!values.includes(r[field]))fail(`Unsupported ${field} in ${r.id}`);
  if(r.validationStatus==='validated'||(key==='gaps'&&r.status==='validated')){if(!r.validator||!/^\d{4}-\d{2}-\d{2}$/.test(r.validatedAt||''))fail(`Validator and YYYY-MM-DD date required in ${r.id}`)}
  if(r.valueLabel==='confirmed'&&(r.validationStatus!=='validated'||!r.validator||!r.validatedAt))fail(`Confirmed Wessam-specific requires recorded owner validation in ${r.id}`);
  if(r.capabilityStatus==='unavailable'&&!r.capabilityEvidence)fail(`Unavailable needs capabilityEvidence in ${r.id}`);
  if(r.severity!=null||r.frequency!=null){if(r.manualWorkshopAssessment!==true)fail(`Severity / frequency require explicit manualWorkshopAssessment in ${r.id}`)}
 }
 for(const s of data.stages)if(!Number.isFinite(s.x)||!Number.isFinite(s.y)||s.x<0||s.x>100||s.y<0||s.y>100)fail(`Invalid map position in ${s.id}`);
 for(const r of data.products)for(const tier of ['gold','platinum','elite'])if(!['available','partial','unavailable','unknown','na'].includes(r.availability?.[tier]))fail(`Invalid product availability in ${r.id}`);
 for(const r of data.touchpoints)if(!['discovery','transactional','support','relationship'].includes(r.purpose)||!['available','reported','unknown','na','unavailable','partial'].includes(r.availability))fail(`Invalid channel purpose / availability in ${r.id}`);
 for(const key of ['gaps','decisions','dependencies','researchProfiles'])for(const r of data[key])if(!['proposed','in-progress','received','reviewed','validated'].includes(r.status))fail(`Invalid research status in ${r.id}`);
 for(const g of data.gaps){if(!['high','medium','low'].includes(g.priority)||!['not-sent','draft','received','reviewed'].includes(g.requestStatus))fail(`Invalid priority / request status in ${g.id}`)}
 for(const k of data.kickoff)if(!Number.isFinite(k.seconds)||k.seconds<0||k.seconds>3600)fail(`Invalid presentation duration in ${k.id}`);
 for(const r of data.findings){text(r,'summary');if(!r.sourceId||!r.sourcePeriod||!r.sourceLineageId||!r.validationStatus||!r.evidenceType||!r.tierScope?.length)fail(`Provenance and scope required in ${r.id}`);const source=data.evidence.find(s=>s.id===r.sourceId);if(source.lineage!==r.sourceLineageId)fail(`Source lineage mismatch in ${r.id}`);}
 for(const s of data.scenes){if(!Array.isArray(s.actions)||s.actions.length>10)fail(`Invalid actions in ${s.id}`);text(s,'goal');text(s,'situation');text(s,'reveal');refs(s,'gapIds','gaps');const seen=new Set();for(const a of s.actions){if(!a.id||seen.has(a.id)||!has('touchpoints',a.channel))fail(`Invalid scene action in ${s.id}`);seen.add(a.id);text(a,'title');text(a,'response');if(!has('touchpoints',a.nextChannel))fail(`Invalid handoff channel in ${s.id}`);}}
 if(!data.routes||typeof data.routes!=='object')fail('Missing routes.');
 for(const t of ['gold','platinum','elite'])if(!Array.isArray(data.routes[t])||data.routes[t].length<3||data.routes[t].some(s=>!has('stages',s)))fail(`Invalid route ${t}`);
 for(const required of ['gold','platinum','elite'])if(!has('tiers',required))fail('Core tiers must remain.');
 for(const s of data.stages)if(!data.scenes.some(x=>x.id===s.id))fail(`Stage has no scene: ${s.id}`);
 if(!data.plan?.methods||!Array.isArray(data.plan.phases)||!data.meta)fail('Missing plan / metadata.');
 for(const phase of data.plan.phases){text(phase,'title');if(!['proposed','in-progress','received','reviewed','validated'].includes(phase.status)||!has('owners',phase.owner))fail('Invalid phase gate.');}
 return data;
}
export function parseDataset(text){if(new TextEncoder().encode(text).byteLength>2000000)throw new Error('JSON exceeds 2 MB.');return validateDataset(JSON.parse(text));}
