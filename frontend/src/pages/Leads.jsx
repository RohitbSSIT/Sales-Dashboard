import { useState } from "react";

import LeadsHeader from "../components/leads/LeadsHeader";
import LeadsFilters from "../components/leads/LeadsFilters";
import LeadsTable from "../components/leads/LeadsTable";
import LeadModal from "../components/leads/LeadModal";
import ConfirmDialog from "../components/common/ConfirmDialog";
import LeadDetailsModal from "../components/leads/LeadDetailsModal";

function Leads() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [deleteLead, setDeleteLead] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [source, setSource] = useState("");

  const handleEditLead = (lead) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
  };

  const handleViewLead = (lead) => {
    setSelectedLead(lead);
    setIsDetailsOpen(true);
  };


  const handleConvert = async (leadId) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/leads/${leadId}/convert`,
      {
        method: "POST",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.detail || "Failed to convert lead");
      return;
    }

    alert("Lead converted successfully");

    // Refresh the leads table
    setRefresh((prev) => !prev);
  } catch (error) {
    console.error("Error converting lead:", error);
    alert("Something went wrong");
  }
};

  return (
    <div className="p-6">
      <LeadsHeader
        onAddLead={() => {
          setSelectedLead(null);
          setIsModalOpen(true);
        }}
      />

      <LeadsFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        source={source}
        setSource={setSource}
      />

      <LeadsTable
        refresh={refresh}
        onEdit={handleEditLead}
        onDelete={(lead) => setDeleteLead(lead)}
        onView={handleViewLead}
        search={search}
        status={status}
        onConvert={handleConvert}
        source={source}
      />

      {deleteLead && (
        <ConfirmDialog
          onCancel={() => setDeleteLead(null)}
          onConfirm={async () => {
            const response = await fetch(
              `http://127.0.0.1:8000/leads/${deleteLead._id}`,
              {
                method: "DELETE",
              },
            );

            const data = await response.json();

            console.log(data);

            setDeleteLead(null);
            setRefresh(!refresh);
          }}
        />
      )}
      {isModalOpen && (
        <LeadModal
          lead={selectedLead}
          onClose={() => setIsModalOpen(false)}
          onLeadAdded={() => setRefresh(!refresh)}
        />
      )}

      {isDetailsOpen && (
        <LeadDetailsModal
          lead={selectedLead}
          onClose={() => {
            setIsDetailsOpen(false);
            setSelectedLead(null);
          }}
        />
      )}
    </div>
  );
}

export default Leads;
