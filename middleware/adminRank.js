export default function ({ $auth, redirect }) {
  if ($auth.user.attributes.rank !== 'super_admin') {
    redirect('/');
  }
}
