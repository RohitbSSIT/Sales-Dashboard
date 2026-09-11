import { useState } from "react";

import ProposalsHeader from "../components/proposals/ProposalsHeader";
import ProposalsFilters from "../components/proposals/ProposalsFilters";
import ProposalsTable from "../components/proposals/ProposalsTable";
import ProposalModal from "../components/proposals/ProposalModal";
import ProposalDetailsModal from "../components/proposals/ProposalDetailsModal";
import ConfirmDialog from "../components/common/ConfirmDialog";

function Proposals() {
  // Add/Edit modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // View details modal
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Currently selected proposal
  const [selectedProposal, setSelectedProposal] = useState(null);

  // Proposal that we want to delete
  const [deleteProposal, setDeleteProposal] = useState(null);

  // Used to refresh the table
  const [refresh, setRefresh] = useState(false);

  // Search and filter
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  // Edit proposal
  const handleEditProposal = (proposal) => {
    setSelectedProposal(proposal);
    setIsModalOpen(true);
  };

  // View proposal
  const handleViewProposal = (proposal) => {
    setSelectedProposal(proposal);
    setIsDetailsOpen(true);
  };

  // Add proposal
  const handleAddProposal = () => {
    setSelectedProposal(null);
    setIsModalOpen(true);
    console.log("button click");
  };

  // Close Add/Edit modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProposal(null);
  };

  // Close details modal
  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
    setSelectedProposal(null);
  };

  // Delete proposal
  const handleDeleteProposal = async () => {
    if (!deleteProposal) {
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/proposals/${deleteProposal._id}`,
        {
          method: "DELETE",
        },
      );

      const data = await response.json();

      console.log(data);

      if (!response.ok) {
        alert("Failed to delete proposal");
        return;
      }

      alert("Proposal deleted successfully");

      // Close confirmation dialog
      setDeleteProposal(null);

      // Refresh table
      setRefresh(!refresh);
    } catch (error) {
      console.error("Error deleting proposal:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <ProposalsHeader onAddProposal={handleAddProposal} />

      {/* Filters */}
      <ProposalsFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />

      {/* Table */}
      <ProposalsTable
        search={search}
        status={status}
        refresh={refresh}
        onView={handleViewProposal}
        onEdit={handleEditProposal}
        onDelete={(proposal) => setDeleteProposal(proposal)}
      />

      {/* Delete Confirmation */}
      {deleteProposal && (
        <ConfirmDialog
          onCancel={() => setDeleteProposal(null)}
          onConfirm={handleDeleteProposal}
        />
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <ProposalModal
          proposal={selectedProposal}
          onClose={handleCloseModal}
          onProposalAdded={() => {
            setRefresh(!refresh);
          }}
        />
      )}

      {/* View Details Modal */}
      {isDetailsOpen && (
        <ProposalDetailsModal
          proposal={selectedProposal}
          onClose={handleCloseDetails}
        />
      )}
    </div>
  );
}

export default Proposals;
