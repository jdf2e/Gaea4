<script lang="tsx">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class TestComponent extends Vue {
    @Prop({ default: 'default value' }) param!: string

    render (h, context) {
        return (
            <div>jsx数据</div>
        )
    }

    mounted () {
        console.log(this.param)
    }
}
</script>
