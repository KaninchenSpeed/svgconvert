import { h, VNode } from 'preact'

const <<Name>> = (props: VNode<SVGElement>['props']) => {
    const raw: VNode<SVGElement> = <<content>>
    raw.props = props
    return raw
}

export default <<Name>>