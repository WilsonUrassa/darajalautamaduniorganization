'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

type Program = { id:string; title:string; description:string|null; file_url:string; file_name:string; created_at:string };

export default function ProgramsPage(){
  const [items,setItems]=useState<Program[]>([]); const [loading,setLoading]=useState(true);
  useEffect(()=>{supabase.from('project_proposals').select('id,title,description,file_url,file_name,created_at').eq('published',true).order('created_at',{ascending:false}).then(({data})=>{setItems(data||[]);setLoading(false)})},[]);
  return <main className="content-page"><section className="page-hero"><div className="container"><p className="eyebrow">Our programs</p><h1>Programs creating<br/><em>meaningful change.</em></h1><p>Explore the programs we are currently conducting with communities and partners to strengthen culture, opportunity and sustainable development.</p></div></section><section className="section section-soft"><div className="container"><div className="section-heading"><div><p className="eyebrow">Current work</p><h2>Programs we are conducting</h2></div><p>Discover the areas where Daraja la Utamaduni is currently working and the initiatives making a difference in our communities.</p></div>{loading?<p>Loading programs…</p>:items.length===0?<div className="empty-state"><strong>Programs will appear here.</strong><p>Our current programs and initiatives will be published here as they are added by the organization.</p></div>:<div className="proposal-list">{items.map((item,i)=><article className="proposal-card" key={item.id}><span className="programme-number">{String(i+1).padStart(2,'0')}</span><div><h3>{item.title}</h3><p>{item.description||'Program conducted by Daraja la Utamaduni Organization.'}</p><small>Current program</small></div>{item.file_url&&<a className="download-link" href={item.file_url} target="_blank" rel="noreferrer">Program document <span>↓</span><small>{item.file_name}</small></a>}</article>)}</div>}</div></section></main>
}
