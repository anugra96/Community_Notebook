import "./Metadata.scss";
import React from "react";
import { useState } from "react";



export default function Metadata() {
    const [active, setActive] = useState(false);


    return (
        <>

        {active ? 
        
            <>
            
                <div className="Meta-Active">
                    <div className="details">
                        <div className="heading">Metadata Information</div>
                        <p>This tool was designed by <a href="https://www.anugrashah.com" target="_blank">Anugra Shah</a> and the <a href="https://jessicathompson.ca/projects/borderline/" target="_blank">Urban Borderlines Research Lab</a>, based on demographic data from the 2016 Census of Canada from Statistics Canada. The data was collected 09/02/2022 and published 06/03/2022. This map shows ‘urban borderlines’ -- invisible boundaries that can affect social and economic mobility. We created this tool to highlight the degrees of difference in household income, housing stability, and race and ethnicity between Dissemination areas, the smallest available geographic unit for which data is available. Borderline is a research-creation project by Jessica Thompson. It was funded by an Insight Development Grant from the Social Sciences and Humanities Research Council of Canada. Further research is funded by a Government of Canada Early Researcher Award.</p>
                    </div>
                    <h1 className="land-acknowledgement">
                        <div className="heading">Land Acknowledgement</div>
                        <p>This map covers the traditional territory of the Haudenosaunee, Anishinabe Waki, Mississauga, and Wendake-Nionwentsïo, and was was produced at the University of Waterloo which is situated on the Haldimand Tract, the land promised to the Six Nations that includes ten kilometres on each side of the Grand River. As a team of researchers led by a Black Canadian, we acknowledge our participation in colonization and recognize our responsibility to engage in reconciliation as outlined by the Truth and Reconciliation Commission of Canada’s 94 Calls to Action. To learn more, visit native-land.ca.  As we engage in critical map making, we acknowledge the colonized and racialized history of mapping including how maps have been used to dominate Indigenous people and places while reproducing the power of the Europeans and the differences between them and the various peoples they subordinated. We also acknowledge that this statement is only a small step in the process of decolonization, and we understand that reconciliation requires systemic change.</p>
                    </h1>
                    <div className="closebutton" onClick={()=>setActive(!active)}>
                        <p>Close</p>
                    </div>
                </div>
            
            
            </> 
            
        
        : 
        
            <>
            
                <div className="Meta" onClick={()=>setActive(!active)}>
                    i
                </div>

            
            </>
        
        }





        </>
    )
}
