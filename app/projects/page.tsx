'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

type Proposal = { id:string; title:string; description:string|null; file_url:string; file_name:string; created_at:string };

export default function ProjectsPage(){
  const [items,setItems]=useState<Proposal[]>([]); const [loading,setLoading]=useState(true);
  useEffect(()=>{supabase.from('project_proposals').select('id,title,description,file_url,file_name,created_at').eq('published',true).order('created_at',{ascending:false}).then(({data})=>{setItems(data||[]);setLoading(false)})},[]);
  return <main className="content-page"><section className="page-hero"><div className="container"><p className="eyebrow">Projects & proposals</p><h1>Ideas becoming<br/><em>community action.</em></h1><p>Explore the projects we are developing and the proposals available for partners, supporters and collaborators.</p></div></section><section className="section section-soft"><div className="container"><div className="section-heading"><div><p className="eyebrow">Current opportunities</p><h2>Project proposals</h2></div><p>Download the latest published proposals and learn more about the work behind each opportunity.</p></div>{loading?<p>Loading proposals…</p>:items.length===0?<div className="empty-state"><strong>No proposals published yet.</strong><p>New project proposals will appear here when they are published by the organization.</p></div>:<div className="proposal-list">{items.map((item,i)=><article className="proposal-card" key={item.id}><span className="programme-number">{String(i+1).padStart(2,'0')}</span><div><h3>{item.title}</h3><p>{item.description||'Project proposal from Daraja la Utamaduni Organization.'}</p><small>Published {new Date(item.created_at).toLocaleDateString()}</small></div><a className="download-link" href={item.file_url} target="_blank" rel="noreferrer">Download <span>↓</span><small>{item.file_name}</small></a></article>)}</div>}</div></section></main>
}
