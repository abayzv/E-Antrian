import Container from "../../components/Container";
import Layout from "../../components/Layout";
import Card from "../../components/Card";
import { Button } from '../../components/Form';
import useVerifyEmail from "../../hooks/useVerifyEmail";
export default function VerifyEmail() {
    const { resendEmailVerification, loading } = useVerifyEmail();
    return (
        <Layout title="Verify your email address">
            <Container>
                <Card header={"Please verify your email address"}>
                    <p className="leading-relaxed mb-4">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero nobis reprehenderit voluptas tempora, sapiente aliquid necessitatibus doloremque quibusdam exercitationem asperiores?
                    </p>
                    <Button onClick={resendEmailVerification}>
                        {loading ? 'Loading . . .' : 'Resend Verification Link'}
                    </Button>
                </Card>
            </Container>
        </Layout>
    );
}
