"use client";

import { useState } from "react";
import { DEPARTMENTS } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  Edit,
  Trash2,
  BookOpen,
  GraduationCap,
  Calendar,
  FileText,
} from "lucide-react";
import { toast } from "sonner";

type ManageType = "department" | "branch" | "year" | "subject";

export default function ManagePage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"add" | "edit">("add");
  const [manageType, setManageType] = useState<ManageType>("subject");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [selectedBranch, setSelectedBranch] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    slug: "",
  });

  const handleOpenDialog = (mode: "add" | "edit", type: ManageType) => {
    setDialogMode(mode);
    setManageType(type);
    setIsDialogOpen(true);
    if (mode === "add") {
      setFormData({ name: "", code: "", slug: "" });
    }
  };

  const handleSubmit = () => {
    if (!formData.name) {
      toast.error("Name is required");
      return;
    }

    if (dialogMode === "add") {
      console.log("Adding new", manageType, formData);
      toast.success(`${manageType} added successfully`);
    } else {
      console.log("Updating", manageType, formData);
      toast.success(`${manageType} updated successfully`);
    }

    setIsDialogOpen(false);
    setFormData({ name: "", code: "", slug: "" });
    // TODO: Implement actual CRUD logic
  };

  const handleDelete = (type: ManageType, name: string) => {
    console.log("Deleting", type, name);
    toast.error(`${name} has been deleted`);
    // TODO: Implement actual delete logic
  };

  // Get filtered data based on selections
  const getFilteredBranches = () => {
    if (!selectedDepartment) return [];
    const dept = DEPARTMENTS.find((d) => d.id === selectedDepartment);
    return dept?.branches || [];
  };

  const getFilteredYears = () => {
    if (!selectedBranch) return [];
    const branches = getFilteredBranches();
    const branch = branches.find((b) => b.id === selectedBranch);
    return branch?.years || [];
  };

  const getFilteredSubjects = () => {
    if (!selectedYear) return [];
    const years = getFilteredYears();
    const year = years.find((y) => y.id === selectedYear);
    return year?.subjects || [];
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Content Management</h1>
        <p className="text-muted-foreground mt-2">
          Manage departments, branches, years, and subjects
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="subjects" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="branches">Branches</TabsTrigger>
          <TabsTrigger value="years">Years</TabsTrigger>
          <TabsTrigger value="subjects">Subjects</TabsTrigger>
        </TabsList>

        {/* Departments Tab */}
        <TabsContent value="departments" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Departments
                </CardTitle>
                <Button
                  onClick={() => handleOpenDialog("add", "department")}
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Department
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {DEPARTMENTS.map((dept) => (
                  <Card key={dept.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold">{dept.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {dept.branches.length} branches
                          </p>
                          <Badge variant="outline" className="mt-2">
                            {dept.slug}
                          </Badge>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleOpenDialog("edit", "department")}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete("department", dept.name)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Branches Tab */}
        <TabsContent value="branches" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Branches
                </CardTitle>
                <Button
                  onClick={() => handleOpenDialog("add", "branch")}
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Branch
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Department Filter */}
              <Select
                value={selectedDepartment}
                onValueChange={setSelectedDepartment}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent>
                  {DEPARTMENTS.map((dept) => (
                    <SelectItem key={dept.id} value={dept.id}>
                      {dept.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Branches List */}
              {selectedDepartment ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {getFilteredBranches().map((branch) => (
                    <Card key={branch.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold">{branch.name}</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              {branch.years.length} years
                            </p>
                            <Badge variant="outline" className="mt-2">
                              {branch.slug}
                            </Badge>
                          </div>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleOpenDialog("edit", "branch")}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete("branch", branch.name)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  Select a department to view branches
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Years Tab */}
        <TabsContent value="years" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Years
                </CardTitle>
                <Button
                  onClick={() => handleOpenDialog("add", "year")}
                  className="gap-2"
                  disabled={!selectedBranch}
                >
                  <Plus className="h-4 w-4" />
                  Add Year
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  value={selectedDepartment}
                  onValueChange={(value) => {
                    setSelectedDepartment(value);
                    setSelectedBranch("");
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Department" />
                  </SelectTrigger>
                  <SelectContent>
                    {DEPARTMENTS.map((dept) => (
                      <SelectItem key={dept.id} value={dept.id}>
                        {dept.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={selectedBranch}
                  onValueChange={setSelectedBranch}
                  disabled={!selectedDepartment}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Branch" />
                  </SelectTrigger>
                  <SelectContent>
                    {getFilteredBranches().map((branch) => (
                      <SelectItem key={branch.id} value={branch.id}>
                        {branch.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Years List */}
              {selectedBranch ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {getFilteredYears().map((year) => (
                    <Card key={year.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold">{year.name}</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              Level {year.level}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {year.subjects.length} subjects
                            </p>
                          </div>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleOpenDialog("edit", "year")}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete("year", year.name)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  Select a department and branch to view years
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Subjects Tab */}
        <TabsContent value="subjects" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Subjects
                </CardTitle>
                <Button
                  onClick={() => handleOpenDialog("add", "subject")}
                  className="gap-2"
                  disabled={!selectedYear}
                >
                  <Plus className="h-4 w-4" />
                  Add Subject
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Select
                  value={selectedDepartment}
                  onValueChange={(value) => {
                    setSelectedDepartment(value);
                    setSelectedBranch("");
                    setSelectedYear("");
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Department" />
                  </SelectTrigger>
                  <SelectContent>
                    {DEPARTMENTS.map((dept) => (
                      <SelectItem key={dept.id} value={dept.id}>
                        {dept.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={selectedBranch}
                  onValueChange={(value) => {
                    setSelectedBranch(value);
                    setSelectedYear("");
                  }}
                  disabled={!selectedDepartment}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Branch" />
                  </SelectTrigger>
                  <SelectContent>
                    {getFilteredBranches().map((branch) => (
                      <SelectItem key={branch.id} value={branch.id}>
                        {branch.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={selectedYear}
                  onValueChange={setSelectedYear}
                  disabled={!selectedBranch}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {getFilteredYears().map((year) => (
                      <SelectItem key={year.id} value={year.id}>
                        {year.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Subjects List */}
              {selectedYear ? (
                <div className="space-y-2">
                  {getFilteredSubjects().map((subject) => (
                    <Card key={subject.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3">
                              <Badge variant="secondary">{subject.code}</Badge>
                              <h3 className="font-semibold">{subject.name}</h3>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {subject.topics.length} topics
                            </p>
                          </div>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleOpenDialog("edit", "subject")}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete("subject", subject.name)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  Select a department, branch, and year to view subjects
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {dialogMode === "add" ? "Add" : "Edit"} {manageType}
            </DialogTitle>
            <DialogDescription>
              {dialogMode === "add"
                ? `Create a new ${manageType}`
                : `Update ${manageType} information`}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder={`Enter ${manageType} name`}
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            {manageType === "subject" && (
              <div className="space-y-2">
                <Label htmlFor="code">Subject Code</Label>
                <Input
                  id="code"
                  placeholder="e.g., CS101"
                  value={formData.code}
                  onChange={(e) =>
                    setFormData({ ...formData, code: e.target.value })
                  }
                />
              </div>
            )}

            {(manageType === "department" || manageType === "branch") && (
              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  placeholder="e.g., computer-science"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({ ...formData, slug: e.target.value })
                  }
                />
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              {dialogMode === "add" ? "Add" : "Update"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
