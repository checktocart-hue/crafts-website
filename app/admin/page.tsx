import { redirect } from 'next/navigation';

export default function AdminRootPage() {
  // Automatically redirect the root /admin URL to the actual writing studio
  redirect('/admin/write');
}
