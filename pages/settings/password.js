import Layout from '../../components/Layout';
import Card from '../../components/Card';
import Container from '../../components/Container';
import { Input, Label, Button, Error } from '../../components/Form';
import { useState } from 'react';
import axios from 'axios';
import toaster from 'toasted-notes';
export default function Password() {
    const [errors, setErrors] = useState([]);
    let current = {
        current_password: '', password: '', password_confirmation: ''
    };
    const [form, setForm] = useState(current);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await axios.put('user/password', form);
            toaster.notify("Password has been updated", {
                position: 'bottom-right'
            });
            setForm(current);
        } catch (r) {
            setErrors(r.response.data.errors);
        }
    };
    return (
        <Layout middleware="auth" title="Change Password">
            <Container>
                <Card header={
                    <>
                        <h1 className="font-semibold text-xl">Change Password</h1>
                        <div className="text-sm text-gray-500">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, sit.
                        </div>
                    </>
                }>
                    <form onSubmit={submitHandler}>
                        <div className="mb-6">
                            <Label htmlFor="current_password">The current password</Label>
                            <Input value={form.current_password} onChange={(e) => setForm(form => ({ ...form, current_password: e.target.value }))} type="password" name="current_password" id="current_password" />
                            {errors && errors.current_password && <Error message={errors.current_password} />}
                        </div>
                        <div className="mb-6">
                            <Label htmlFor="password">New Password</Label>
                            <Input value={form.password} onChange={(e) => setForm(form => ({ ...form, password: e.target.value }))} type="password" name="password" id="password" />
                            {errors && errors.password && <Error message={errors.password} />}
                        </div>
                        <div className="mb-6">
                            <Label htmlFor="password_confirmation">Confirm Password</Label>
                            <Input value={form.password_confirmation} onChange={(e) => setForm(form => ({ ...form, password_confirmation: e.target.value }))} type="password" name="password_confirmation" id="password_confirmation" />
                        </div>
                        <Button>Update Password</Button>
                    </form>
                </Card>
            </Container>
        </Layout>
    );
}
