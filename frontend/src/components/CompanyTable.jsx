function CompanyTable({

    companies = []

}) {

    return (

        <div
            style={{
                background: "white",
                padding: "25px",
                borderRadius: "15px",
                boxShadow: "0 4px 15px rgba(0,0,0,.08)"
            }}
        >

            <h2>Top Company Matches</h2>

            <table
                style={{
                    width: "100%"
                }}
            >

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