import { useEffect, useState } from "react";

import OpportunitiesHeader from "../components/opportunities/OpportunitiesHeader";
import OpportunitiesFilters from "../components/opportunities/OpportunitiesFilters";
import OpportunitiesTable from "../components/opportunities/OpportunitiesTable";
import OpportunityModal from "../components/opportunities/OpportunityModal";
import ConfirmDialog from "../components/common/ConfirmDialog";
import OpportunityDetailsModal from "../components/opportunities/OpportunityDetailsModal";

function Opportunities() {
  const [search, setSearch] = useState("");
  const [stage, setStage] = useState("");

  const [opportunities, setOpportunities] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedOpportunity, setSelectedOpportunity] = useState(null);

  // Delete states
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [opportunityToDelete, setOpportunityToDelete] = useState(null);

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleViewOpportunity = (opportunity) => {
    setSelectedOpportunity(opportunity);
    setIsDetailsOpen(true);
  };

  // GET Opportunities
  const fetchOpportunities = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/opportunities");

      const data = await response.json();

      setOpportunities(data);
    } catch (error) {
      console.error("Error fetching opportunities:", error);
    }
  };

  // Fetch when page loads
  useEffect(() => {
    fetchOpportunities();
  }, []);

  // Open Add Modal
  const handleAddOpportunity = () => {
    setSelectedOpportunity(null);
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleEditOpportunity = (opportunity) => {
    setSelectedOpportunity(opportunity);
    setIsModalOpen(true);
  };

  // Open Delete Dialog
  const handleDeleteClick = (opportunity) => {
    setOpportunityToDelete(opportunity);
    setIsDeleteDialogOpen(true);
  };

  // Confirm Delete
  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/opportunities/${opportunityToDelete._id}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to delete opportunity");
      }

      await fetchOpportunities();

      setIsDeleteDialogOpen(false);
      setOpportunityToDelete(null);

      console.log("Opportunity deleted successfully");
    } catch (error) {
      console.error("Error deleting opportunity:", error);
    }
  };

  return (
    <div className="p-6">
      <OpportunitiesHeader onAddOpportunity={handleAddOpportunity} />

      <OpportunitiesFilters
        search={search}
        setSearch={setSearch}
        stage={stage}
        setStage={setStage}
      />

      <OpportunitiesTable
        opportunities={opportunities}
        onEdit={handleEditOpportunity}
        onDelete={handleDeleteClick}
        onView={handleViewOpportunity}
        stage={stage}
        search={search}
      />

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <OpportunityModal
          opportunity={selectedOpportunity}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedOpportunity(null);
          }}
          onOpportunityAdded={fetchOpportunities}
        />
      )}

      {isDetailsOpen && (
        <OpportunityDetailsModal
          opportunity={selectedOpportunity}
          onClose={() => {
            setIsDetailsOpen(false);
            setSelectedOpportunity(null);
          }}
        />
      )}

      {/* Delete Confirmation */}
      {isDeleteDialogOpen && (
        <ConfirmDialog
          onConfirm={handleDeleteConfirm}
          onCancel={() => {
            setIsDeleteDialogOpen(false);
            setOpportunityToDelete(null);
          }}
        />
      )}
    </div>
  );
}

export default Opportunities;
