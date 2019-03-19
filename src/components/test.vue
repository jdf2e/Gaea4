<script lang="tsx">
import Vue, { CreateElement } from 'vue'
import { Component, Prop, Emit, Watch } from 'vue-property-decorator'
@Component
export default class TestComponent extends Vue {
    test: string = 'test'
    @Prop(Number) readonly propA!: number
    @Prop({ default: 'default value' }) readonly propB!: string
    @Prop([String, Boolean]) readonly propC!: string | boolean

    render(h: CreateElement) {
        return (<div class='jdc-logo'><s></s></div>)
    }

    @Watch('propA')
    onChildChanged (val: number, oldVal: number) {}

    @Emit()
    addToCount (n: number) {
        this.test += n
    }

    @Emit()
    addToCount1 () {
        return 10
    }

    mounted () {
        // console.log(this.propA)
    }
}
</script>

<style lang="scss" scoped>
    .jdc-logo{
        text-align: center;
        margin-top:4rem;
        s{
            display: inline-block;
            height:0.24rem;
            width:1.15rem;
            background:url('../asset/img/logo.png') 0 0 no-repeat;
            background-size:100% 100%;
        }
    }
    .webp .jdc-logo{
        s{
            background:url('../asset/img/webp/logo.webp') 0 0 no-repeat;
            background-size:100% 100%;
        }
    }
</style>
