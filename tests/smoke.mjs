import assert from 'node:assert/strict';
import {createSeed} from '../src/data/index.js';
import {validateDataset,parseDataset} from '../src/validation.js';
import {freshJourney,entryPosition,getActions,resolveAction,commitResult,nextStage,changeTier,goBack,shareHash,parseHash} from '../src/journey.js';
import {esc,csv,createStorage} from '../src/utils.js';
const data=createSeed({ignoreOverride:true});validateDataset(data);validateDataset(createSeed());
assert.equal(data.findings.length,46);assert.equal(data.researchProfiles.length,24);assert.equal(data.gaps.length,14);
for(const tier of ['gold','platinum','elite']){
 assert.equal(data.researchProfiles.filter(p=>p.tier===tier).length,8);
 let j={...freshJourney(),tier,started:true};let guard=0;
 while(j.stage!=='debrief'){
  const actions=getActions(data,tier,j.stage);assert.ok(actions.length>0,`${tier} / ${j.stage}`);
  if(tier==='gold')assert.ok(actions.every(a=>a.channel!=='rm'&&a.nextChannel!=='rm'));
  const result=resolveAction(data,j,actions[0].id);assert.deepEqual(result,resolveAction(data,j,actions[0].id));
  j.result=result;j=commitResult(j);j.stage=nextStage(data,tier,j.stage);assert.ok(++guard<20);
 }
 assert.equal(j.trail.length,data.routes[tier].length-1);
 const oldCount=j.trail.length;j=goBack(j);assert.equal(j.trail.length,oldCount-1);
 assert.equal(j.stage,data.routes[tier].at(-2));j.result=resolveAction(data,j,getActions(data,tier,j.stage)[0].id);j=commitResult(j);assert.equal(j.trail.length,oldCount);
 for(const stage of data.stages){const actions=getActions(data,tier,stage.id);if(tier==='gold')assert.ok(actions.every(a=>a.channel!=='rm'&&a.nextChannel!=='rm'),stage.id)}
}
let j=freshJourney();const app=resolveAction(data,j,'open-app'),site=resolveAction(data,j,'browse-site');assert.notEqual(app.channel,site.channel);assert.notDeepEqual(entryPosition('app'),entryPosition('website'));assert.notDeepEqual(entryPosition('rm'),entryPosition('branch'));assert.notDeepEqual(app.response,site.response);
const switchJ=changeTier({...j,stage:'resolve',channel:'rm'},'gold');assert.equal(switchJ.stage,'resolve');assert.equal(switchJ.channel,'phone');
assert.deepEqual(parseDataset(JSON.stringify(data)),data);
for(const mutate of [d=>d.findings.push(d.findings[0]),d=>d.findings[0].sourceId='missing',d=>d.products[0].valueLabel='confirmed',d=>d.findings[0].capabilityStatus='unavailable',d=>d.findings[0].frequency=10,d=>d.meta.reportedInterviews='<img>',d=>d.stages[0].x='0;display:none']){const x=structuredClone(data);mutate(x);assert.throws(()=>validateDataset(x));}
assert.throws(()=>parseDataset('{"schemaVersion":1,"datasetType":"presentation-demo","__proto__":{"polluted":1}}'));
const escaped=esc('<img src=x onerror="alert(1)">');assert.ok(!escaped.includes('<img'));assert.ok(escaped.includes('&lt;img'));
assert.ok(csv([{x:'=HYPERLINK("https://bad")',ar:'مرحبا',note:'one\ntwo'}]).includes("'=HYPERLINK"));
const memory=new Map();const mock={setItem:(k,v)=>memory.set(k,v),getItem:k=>memory.get(k)||null,removeItem:k=>memory.delete(k)};const store=createStorage(mock);assert.ok(store.available);store.set('test',{x:1});assert.deepEqual(store.get('test'),{x:1});const unavailable=createStorage(null);assert.equal(unavailable.available,false);assert.equal(unavailable.set('x',{}),false);
const url=shareHash({view:'journey',lang:'ar',journey:{...freshJourney(),tier:'elite',stage:'family'}});const parsed=parseHash(url,data);assert.equal(parsed.lang,'ar');assert.equal(parsed.stage,'family');assert.equal(parsed.tier,'elite');const invalid=parseHash('#view=bad&tier=bad&stage=bad&lang=bad',data);assert.equal(invalid.view,'home');assert.equal(invalid.tier,'gold');assert.equal(invalid.stage,'discover');
for(const f of data.findings){assert.ok(f.sourceId&&f.sourcePeriod&&f.sourceLineageId&&f.validationStatus&&f.tierScope.length);assert.equal(f.severity,null);assert.equal(f.frequency,null)}
for(const source of data.evidence)assert.equal(source.access.en.includes('not imported'),true);
assert.ok(data.kickoff.reduce((sum,k)=>sum+k.seconds,0)>=720);assert.ok(data.kickoff.reduce((sum,k)=>sum+k.seconds,0)<=900);
console.log('PASS: all three routes; channel branching; all-stage Gold RM exclusion; deterministic replay; backtracking; import validation; CSV escaping; persistence fallback; safe hash defaults; evidence provenance; proposed sampling; kick-off duration.');
