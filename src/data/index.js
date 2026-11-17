import presentationOverride from './presentation-overrides.js';
import * as catalog from './catalog.js';
import {findings} from './findings.js';
import {gaps} from './gaps.js';
import {scenes,routes,kickoff} from './scenarios.js';
export function createSeed({ignoreOverride=false}={}){
 if(presentationOverride&&!ignoreOverride)return structuredClone(presentationOverride);
 const {bi,...records}=catalog;
 return structuredClone({schemaVersion:1,datasetType:'presentation-demo',meta:{title:{en:'Wessam 360° — presentation dataset',ar:'وسام ٣٦٠° — بيانات العرض'},briefDate:'2026-11-17',originalsImported:false,reportedInterviews:12,reportedPainEntries:170,inventoryAudited:false},...records,concepts:records.concepts.map((c,i)=>{const ids=[['F03','F04'],['F06','F07'],['F15','F18','F19'],['F46','F28'],['F21','F29'],['F09','F10'],['F22','F23','F24','F25'],['F32','F33'],['F35','F36'],['F37','F33']][i];return {...c,supportingFindingIds:ids,need:findings.find(f=>f.id===ids[0]).summary}}),findings,gaps,scenes,routes,kickoff});
}
export const collections=['findings','gaps','evidence','products','benefits','touchpoints','owners','decisions','dependencies','researchProfiles','concepts','scenes','tiers','personas','chapters','stages','kickoff'];
