
import { useState } from 'react';
import { EmployeeType } from '../data/employees';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface EditProfileProps {
  employee: EmployeeType;
  onSave: (updatedEmployee: EmployeeType) => void;
}

const EditProfile = ({ employee, onSave }: EditProfileProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    defaultValues: {
      bio: employee.bio || '',
      responsibilities: employee.responsibilities || '',
      skills: employee.skills?.join(', ') || '',
      interests: employee.interests?.join(', ') || '',
      mentoringAvailable: employee.mentoring?.available || false,
      mentoringTopics: employee.mentoring?.topics?.join(', ') || '',
      mentoringExperience: employee.mentoring?.experience || '',
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const updatedEmployee = {
        ...employee,
        bio: data.bio,
        responsibilities: data.responsibilities,
        skills: data.skills.split(',').map((skill) => skill.trim()).filter(Boolean),
        interests: data.interests.split(',').map((interest) => interest.trim()).filter(Boolean),
        mentoring: {
          available: data.mentoringAvailable,
          topics: data.mentoringTopics.split(',').map((topic) => topic.trim()).filter(Boolean),
          experience: data.mentoringExperience,
        },
      };
      
      onSave(updatedEmployee);
      setIsSubmitting(false);
      toast.success('Profile updated successfully!');
    }, 1000);
  });

  return (
    <div className="py-2">
      <h2 className="text-xl font-semibold mb-6">Edit Profile</h2>
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Biography</FormLabel>
                <FormControl>
                  <Textarea placeholder="Tell us about yourself..." {...field} rows={4} />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="responsibilities"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Responsibilities</FormLabel>
                <FormControl>
                  <Textarea placeholder="What are your current job responsibilities?" {...field} rows={4} />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="skills"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Skills</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter your skills (comma separated)" {...field} rows={2} />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="interests"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Interests</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter your professional interests (comma separated)" {...field} rows={2} />
                </FormControl>
              </FormItem>
            )}
          />
          
          <div className="border-t pt-4">
            <h3 className="text-lg font-medium mb-4">Mentoring Information</h3>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="mentoringAvailable"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                        className="w-4 h-4 rounded border-gray-300"
                      />
                    </FormControl>
                    <FormLabel className="font-normal">Available for mentoring</FormLabel>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="mentoringTopics"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mentoring Topics</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Topics you can mentor on (comma separated)" {...field} rows={2} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="mentoringExperience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mentoring Experience</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe your mentoring experience..." {...field} rows={3} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          <div className="pt-2 flex gap-2 justify-end">
            <Button type="button" variant="outline">Cancel</Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditProfile;
