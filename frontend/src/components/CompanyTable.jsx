function CompanyTable({

    companies = []

}) {

    return (

        <div className="glass-panel section-card company-table">

            <h2 className="section-title">Top Company Matches</h2>

            <table>

                <thead>

                    <tr>

                        <th>Rank</th>

                        <th>Company</th>

                        <th>Score</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        companies.slice(0,5).map((company,index)=>(

                            <tr key={index}>

                                <td>

                                    {index+1}

                                </td>

                                <td>

                                    {company.company}

                                </td>

                                <td>

                                    {company.compatibility_score}%

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}

export default CompanyTable;