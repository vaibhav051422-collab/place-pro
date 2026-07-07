function ProgressBar({ value }) {

    return (

        <div
            style={{
                width: "100%",
                height: "12px",
                background: "#E5E7EB",
                borderRadius: "10px",
                overflow: "hidden"
            }}
        >

            <div

                style={{
                    width: `${value}%`,
                    height: "100%",
                    background: "#2563EB",
                    transition: "0.5s"
                }}

            />

        </div>

    );

}

export default ProgressBar;