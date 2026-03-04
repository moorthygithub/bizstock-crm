<Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
    {isEditMode ? (
      <div>
        <div className="sm:hidden">
          <button className="px-2 py-1 bg-yellow-400 hover:bg-yellow-600 rounded-lg text-black text-xs">
            <Edit className="w-4 h-4" />
          </button>
        </div>
        <div className="hidden sm:block">
          <Button
            variant="ghost"
            size="icon"
            className={`transition-all duration-200 ${
              isHovered ? "bg-blue-50" : ""
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Edit
              className={`h-4 w-4 transition-all duration-200 ${
                isHovered ? "text-blue-500" : ""
              }`}
            />
          </Button>
        </div>
      </div>
    ) : pathname === "/master/branch" ? (
      <div>
        <div className="sm:hidden">
          <Button
            variant="default"
            className="md:ml-2 bg-yellow-400 hover:bg-yellow-600 text-black rounded-l-full"
          >
            <SquarePlus className="h-4 w-4" /> Branch
          </Button>
        </div>
        <div className="hidden sm:block">
          <Button
            variant="default"
            className={`md:ml-2 ${ButtonConfig.backgroundColor} ${ButtonConfig.hoverBackgroundColor} ${ButtonConfig.textColor}`}
          >
            <SquarePlus className="h-4 w-4 mr-2" /> Branch
          </Button>
        </div>
      </div>
    ) : (
      <Button
        variant="outline"
        className="text-red-600 cursor-default"
        disabled
      >
        Buyer<span className="text-red-500 ml-1">*</span>
      </Button>
    )}
  </DialogTrigger>

  <DialogContent className="sm:max-w-[500px]">
    {isFetching ? (
      <div className="flex justify-center py-6">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    ) : (
      <>
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Update Branch" : "Create New Branch"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Edit the details for the branch"
              : "Enter the details for the new branch"}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 mt-4">
          {!isEditMode && (
            <>
              <div>
                <label className="text-sm font-medium">Branch Name *</label>
                <Input
                  placeholder="Enter Branch Name"
                  value={formData.branch_name}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      branch_name: e.target.value,
                    }))
                  }
                />
              </div>

              <div>
                <label className="text-sm font-medium">Branch Prefix *</label>
                <Input
                  placeholder="Enter Branch Prefix"
                  maxLength={2}
                  value={formData.branch_prefix}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.length <= 2) {
                      setFormData((prev) => ({
                        ...prev,
                        branch_prefix: value,
                      }));
                    }
                  }}
                />
              </div>
            </>
          )}

          <div>
            <label className="text-sm font-medium">Branch Whatsapp *</label>
            <Input
              placeholder="Enter Branch Whatsapp"
              value={formData.branch_whatsapp}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d{0,10}$/.test(value)) {
                  setFormData((prev) => ({
                    ...prev,
                    branch_whatsapp: value,
                  }));
                }
              }}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Branch Email *</label>
            <Input
              type="email"
              placeholder="Enter Branch Email"
              value={formData.branch_email}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  branch_email: e.target.value,
                }))
              }
            />
          </div>

          {/* Keep your Select components exactly same here */}

          {isEditMode && hasChanges && (
            <Alert className="bg-blue-50 border-blue-200">
              <AlertCircle className="h-4 w-4 text-blue-500" />
              <AlertDescription className="text-blue-600 text-sm">
                You have unsaved changes
              </AlertDescription>
            </Alert>
          )}

          <Button
            onClick={handleSubmit}
            disabled={isEditMode ? !hasChanges : isLoading}
            className={`mt-2 ${ButtonConfig.backgroundColor} ${ButtonConfig.hoverBackgroundColor} ${ButtonConfig.textColor}`}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isEditMode ? "Updating..." : "Creating..."}
              </>
            ) : isEditMode ? (
              "Update Branch"
            ) : (
              "Create Branch"
            )}
          </Button>
        </div>
      </>
    )}
  </DialogContent>
</Dialog>;
