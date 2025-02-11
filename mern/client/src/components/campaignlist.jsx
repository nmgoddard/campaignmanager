import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function CampaignList() {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const response = await fetch("http://localhost:5050/campaigns");
                if (!response.ok) {
                    throw new Error(`Error fetching campaigns: ${response.statusText}`);
                }
                const data = await response.json();
                setCampaigns(data);
            } catch (err) {
                console.error("Failed to fetch campaigns:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCampaigns();
    }, []);

    const handleCreateCampaign = async () => {
        navigate("/campaigns/new");
    };

    if (loading) return <p className="text-lg text-gray-600">Loading campaigns...</p>;
    if (error)
        return (
            <div className="bg-red-200 text-red-800 p-2 rounded">
                <p>Error: {error}</p>
            </div>
        );

    console.log("CampaignList - campaignlist did stuff")

    return (
        <div className="flex-1 flex-col justify-center max-w-6xl min-w-96 rounded-lg p-2" style={{ background: "#e9bf69" }}>
            {campaigns.length === 0 ? (
                <div className="text-center">
                    <p className="text-lg">No campaigns available.</p>
                    <button onClick={handleCreateCampaign} className="mt-2 bg-green-600 text-white px-4 py-2 rounded">
                        Create One
                    </button>
                </div>
            ) : (
                campaigns.map((campaign) => (
                    <div key={campaign._id} className="p-2 border-b">
                        <Link to={`/campaigns/${campaign._id}`} className="text-xl font-bold hover:underline">
                            {campaign.title}
                        </Link>
                    </div>
                ))
            )}
            <button onClick={handleCreateCampaign} className="bg-green-600 text-white px-4 py-2 rounded mt-2">
                +
            </button>
        </div>
    );
}
