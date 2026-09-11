function LeadDetailsModal({ lead, onClose }) {
  if (!lead) {
    return null;
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
          
          <div>
            
            <h2 className="text-xl font-semibold text-gray-900">
              
              Lead Details
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              
              View complete lead information
            </p>
          </div>
          {/* Close Icon */}
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-full p-2 text-2xl leading-none text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
            aria-label="Close"
          >
            
            ×
          </button>
        </div>
        {/* Content */}
        <div className="space-y-6 p-6">
          
          {/* Lead Information */}
          <div>
            
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
              
              Lead Information
            </h3>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              
              {/* Lead Name */}
              <div>
                
                <p className="text-sm text-gray-500"> Lead Name </p>
                <p className="mt-1 font-medium text-gray-900">
                  
                  {lead.leadName}
                </p>
              </div>
              {/* Contact Person */}
              <div>
                
                <p className="text-sm text-gray-500"> Contact Person </p>
                <p className="mt-1 font-medium text-gray-900">
                  
                  {lead.contactPerson}
                </p>
              </div>
              {/* Company */}
              <div>
                
                <p className="text-sm text-gray-500"> Company </p>
                <p className="mt-1 font-medium text-gray-900">
                  
                  {lead.company}
                </p>
              </div>
              {/* Service */}
              <div>
                
                <p className="text-sm text-gray-500"> Service </p>
                <p className="mt-1 font-medium text-gray-900">
                  
                  {lead.service}
                </p>
              </div>
            </div>
          </div>
          {/* Contact Information */}
          <div>
            
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
              
              Contact Information
            </h3>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              
              {/* Email */}
              <div>
                
                <p className="text-sm text-gray-500"> Email </p>
                <p className="mt-1 break-all font-medium text-gray-900">
                  
                  {lead.email}
                </p>
              </div>
              {/* Phone */}
              <div>
                
                <p className="text-sm text-gray-500"> Phone </p>
                <p className="mt-1 font-medium text-gray-900">
                  
                  {lead.phone}
                </p>
              </div>
            </div>
          </div>
          {/* Sales Information */}
          <div>
            
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
              
              Sales Information
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              
              {/* Budget */}
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                
                <p className="text-xs text-gray-500"> Budget </p>
                <p className="mt-2 font-semibold text-gray-900">
                  
                  {lead.budget || "Not specified"}
                </p>
              </div>
              {/* Lead Source */}
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                
                <p className="text-xs text-gray-500"> Lead Source </p>
                <p className="mt-2 font-semibold text-gray-900">
                  
                  {lead.leadSource}
                </p>
              </div>
              {/* Status */}
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                
                <p className="text-xs text-gray-500"> Status </p>
                <p className="mt-2 font-semibold text-gray-900">
                  
                  {lead.status}
                </p>
              </div>
              {/* Assigned To */}
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                
                <p className="text-xs text-gray-500"> Assigned To </p>
                <p className="mt-2 font-semibold text-gray-900">
                  
                  {lead.assignedTo}
                </p>
              </div>
            </div>
          </div>
          {/* Follow-up Information */}
          <div>
            
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
              
              Follow-up Information
            </h3>
            <div>
              
              <p className="text-sm text-gray-500"> Next Follow-up </p>
              <p className="mt-1 font-medium text-gray-900">
                
                {lead.nextFollowUp || "No follow-up scheduled"}
              </p>
            </div>
          </div>
          {/* Notes */}
          <div>
            
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
              
              Notes
            </h3>
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
              
              <p className="whitespace-pre-wrap text-sm leading-6 text-gray-700">
                
                {lead.notes || "No notes available"}
              </p>
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="flex justify-end border-t border-gray-200 px-6 py-4">
          
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
export default LeadDetailsModal;
