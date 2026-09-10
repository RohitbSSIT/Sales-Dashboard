import { useState } from "react";

import LeadsHeader from "../components/leads/LeadsHeader";
import LeadsFilters from "../components/leads/LeadsFilters";
import LeadsTable from "../components/leads/LeadsTable";
import LeadModal from "../components/leads/LeadModal";
import ConfirmDialog from "../components/common/ConfirmDialog";

function Leads() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [deleteLead, setDeleteLead] = useState(null);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [source, setSource] = useState("");

  const handleEditLead = (lead) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
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
        search={search}
        status={status}
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
    </div>
  );
}

export default Leads;
