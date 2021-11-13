import DescriptionArea from '../../components/AuthenticationComponents/DescriptionArea'
import ActionsArea from "../../components/AuthenticationComponents/ActionsArea";
import PageWrapper from '../../components/UI/PageWrapper';

const SignUpPage: React.FC = () => {
    return (
        <PageWrapper isCentered>
            <DescriptionArea />
            <ActionsArea
                buttonText='Register' title='Registration' isSignUp
            />
        </PageWrapper>
    )
}

export default SignUpPage;